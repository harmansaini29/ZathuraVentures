// Spiral Glass Hollow — Originkit
"use client";

import type { CSSProperties } from "react";
import * as React from "react";
import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Cpu, ShieldCheck, Layers, Zap, Cloud, Database, Sparkles, Terminal, Activity, ArrowDown } from "lucide-react";

const RenderTarget = {
    current: () => "preview",
    hasRestrictions: () => false,
    canvas: "canvas",
    export: "export",
    preview: "preview",
    thumbnail: "thumbnail",
};

const ADVANCED_DEFAULTS = {
    coilRadius: 45,
    tubeRadius: 18,
    pitch: 78,
    startAngle: 203,
    turnMs: 13700,
    cameraDistance: 360,
    letterHeight: 51,
    letterDepth: 33,
    tracking: 2,
    fontWeight: 900,
    faceColor: "#5B005D",
    edgeColor: "#4FD8E8",
    fringeColor: "#AA40E0",
    interiorColor: "#030C38",
    rimColor: "#51676F",
    sheenColor: "#E8ECF5",
    sheen: 51,
    iridescence: 51,
    specular: 100,
    streak: 62,
    ior: 250,
    bounces: 1,
    striations: 100,
    stripeCount: 40,
    haze: 100,
    farDim: 69,
    lightAngle: 35,
    resolution: 100,
    marchSteps: 45,
    innerSteps: 22,
    grain: 0,
    vignette: 0,
};

const TAU = Math.PI * 2;
const REF_ASPECT = 1.295;

type RGB = [number, number, number];

function parseColor(input: unknown, fallback: RGB): RGB {
    if (typeof input !== "string" || !input) return fallback;
    let s = input.trim();
    const v = s.match(/^var\([^,]+,\s*(.+)\)$/);
    if (v) s = v[1].trim();
    if (s[0] === "#") {
        let h = s.slice(1);
        if (h.length === 3 || h.length === 4)
            h = h
                .split("")
                .map((c) => c + c)
                .join("");
        if (h.length >= 6) {
            const n = parseInt(h.slice(0, 6), 16);
            if (!isNaN(n))
                return [((n >> 16) & 255) / 255, ((n >> 8) & 255) / 255, (n & 255) / 255];
        }
    }
    const m = s.match(/rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i);
    if (m) return [+m[1] / 255, +m[2] / 255, +m[3] / 255];
    return fallback;
}

const VERT = `#version 300 es
in vec2 aPos;
void main() { gl_Position = vec4(aPos, 0.0, 1.0); }`;

const FRAG = `#version 300 es
precision highp float;
out vec4 fragColor;
uniform vec2 uRes;
uniform float uUnit;
uniform float uTheta;
uniform float uR;
uniform float uTube;
uniform float uK;
uniform float uCam;
uniform sampler2D uText;
uniform float uTextLen;
uniform float uGlyphH;
uniform float uDepth;
uniform vec3 uBg;
uniform vec3 uFace;
uniform vec3 uWall;
uniform vec3 uEdge;
uniform vec3 uFringe;
uniform vec3 uInterior;
uniform vec3 uRim;
uniform vec3 uSheen;
uniform float uSheenAmt;
uniform float uIrid;
uniform float uSpec;
uniform float uStreak;
uniform float uIor;
uniform float uDisp;
uniform float uBounces;
uniform float uStripeAmt;
uniform float uStripeFreq;
uniform float uHaze;
uniform float uFarDim;
uniform vec3 uLight;
uniform float uSteps;
uniform float uInSteps;
uniform float uGrain;
uniform float uVignette;
uniform float uTime;

const float TAU = 6.28318530718;

vec3 helixC(float ph) {
    float a = ph + uTheta;
    return vec3(uR * cos(a), uK * ph, uR * sin(a));
}

float initPhi(vec3 p) {
    float a = atan(p.z, p.x) - uTheta;
    return a + TAU * floor((p.y / uK - a) / TAU + 0.5);
}

float newton(vec3 p, float ph) {
    float a = ph + uTheta;
    float c = cos(a);
    float s = sin(a);
    vec3 d = p - vec3(uR * c, uK * ph, uR * s);
    float g = -dot(d, vec3(-uR * s, uK, uR * c));
    float h = max(uK * uK + uR * (c * p.x + s * p.z), 0.5 * uK * uK);
    return ph - clamp(g / max(h, 1e-5), -0.8, 0.8);
}

float localAt(vec3 q, float ph, out vec3 T, out vec3 N, out vec3 B, out vec3 dq) {
    float a = ph + uTheta;
    float c = cos(a);
    float s = sin(a);
    T = normalize(vec3(-uR * s, uK, uR * c));
    N = vec3(c, 0.0, s);
    B = cross(T, N);
    dq = q - vec3(uR * c, uK * ph, uR * s);
    return dot(dq, dq);
}

float glyph(float sx, float gy) {
    float v = 0.5 - gy / max(uGlyphH, 1e-4);
    if (v < 0.0 || v > 1.0) return 0.0;
    return textureLod(uText, vec2(sx / max(uTextLen, 1e-4), v), 0.0).r;
}

bool insideLetter(vec3 q, float ph, float arcK) {
    ph = newton(q, ph);
    vec3 T; vec3 N; vec3 B; vec3 dq;
    float r2 = localAt(q, ph, T, N, B, dq);
    if (r2 > uTube * uTube) return false;
    float u = dot(dq, N);
    if (abs(u) >= uDepth) return false;
    return glyph(-(ph * arcK + dot(dq, T)), dot(dq, B)) > 0.5;
}

vec3 envRefl(vec3 r) {
    vec3 Lstreak = normalize(vec3(-0.35, 0.9, 0.45));
    float top = smoothstep(-0.3, 0.9, r.y);
    vec3 e = vec3(0.06) + vec3(0.42) * top;
    e += vec3(0.6) * smoothstep(0.80, 0.97, dot(r, uLight));
    e += vec3(1.0) * smoothstep(0.982, 0.995, dot(r, Lstreak)) * uStreak;
    return e;
}

void main() {
    vec2 frag = gl_FragCoord.xy;
    vec2 q = (frag - 0.5 * uRes) / uUnit;
    vec3 ro = vec3(0.0, 0.0, uCam);
    vec3 rd = normalize(vec3(q, -uCam));
    vec3 col = uBg;

    float zmax = uR + uTube + 0.01;
    float t = (zmax - uCam) / rd.z;
    float t1 = (-zmax - uCam) / rd.z;
    float minD = 1e3;
    bool hit = false;
    float ph = 0.0;
    vec3 p = ro;

    if (abs(q.x) * (uCam - zmax) / uCam < zmax + 0.03) {
        for (int i = 0; i < 96; i++) {
            if (float(i) >= uSteps) break;
            p = ro + rd * t;
            ph = initPhi(p);
            ph = newton(p, ph);
            ph = newton(p, ph);
            float d = length(p - helixC(ph)) - uTube;
            minD = min(minD, d);
            if (d < 0.0006) { hit = true; break; }
            t += min(d * 0.9, uTube * 0.8);
            if (t > t1) break;
        }
    }

    if (hit) {
        ph = newton(p, ph);
        vec3 T; vec3 N; vec3 B; vec3 dp;
        localAt(p, ph, T, N, B, dp);
        vec3 n = normalize(dp);
        vec3 v = -rd;
        float ndv = clamp(dot(n, v), 0.0, 1.0);
        float F = 0.04 + 0.96 * pow(1.0 - ndv, 5.0);
        float arcK = sqrt(uR * uR + uK * uK);
        float arc = ph * arcK;

        vec3 rG = refract(rd, n, 1.0 / uIor);
        vec3 rR = refract(rd, n, 1.0 / max(uIor - uDisp, 1.01));
        vec3 rB = refract(rd, n, 1.0 / (uIor + uDisp));

        float stepLen = 2.1 * uTube / max(uInSteps, 1.0);
        vec3 org = p;
        vec3 dir = rG;
        float seg = 0.0;
        float total = 0.0;
        float bounces = 0.0;
        float atten = 1.0;
        float phi = ph;
        bool lhit = false;
        bool face = false;
        float covH = 0.0;
        float uH = 0.0;
        float sxH = 0.0;
        float gyH = 0.0;
        vec3 qh = p;
        vec3 dirH = rG;
        vec3 Th = T; vec3 Nh = N; vec3 Bh = B;
        float prevCov = glyph(-(arc + dot(dp, T)), dot(dp, B));

        for (int i = 1; i <= 144; i++) {
            if (float(i) > uInSteps * (1.0 + uBounces)) break;
            seg += stepLen;
            total += stepLen;
            vec3 qq = org + dir * seg;
            phi = newton(qq, phi);
            vec3 Ti; vec3 Ni; vec3 Bi; vec3 dq;
            float r2 = localAt(qq, phi, Ti, Ni, Bi, dq);
            if (r2 > uTube * uTube) {
                if (bounces >= uBounces) break;
                vec3 nIn = normalize(dq);
                org = org + dir * (seg - stepLen);
                dir = reflect(dir, nIn);
                seg = 0.0;
                bounces += 1.0;
                atten *= 0.72;
                prevCov = 0.0;
                continue;
            }
            float u = dot(dq, Ni);
            float sx = -(phi * arcK + dot(dq, Ti));
            float gy = dot(dq, Bi);
            float cv = glyph(sx, gy);
            if (cv > 0.5 && abs(u) < uDepth) {
                lhit = true;
                face = prevCov > 0.5;
                covH = cv; uH = u; sxH = sx; gyH = gy;
                Th = Ti; Nh = Ni; Bh = Bi;
                qh = qq; dirH = dir;
                break;
            }
            prevCov = cv;
        }

        vec3 interiorC = uInterior * 0.5 * ndv;
        vec3 inner = interiorC;
        if (lhit) {
            float e = uGlyphH * 1.5 / 128.0;
            float gs = glyph(sxH + e, gyH) - glyph(sxH - e, gyH);
            float gw = glyph(sxH, gyH + e) - glyph(sxH, gyH - e);
            vec3 gWorld = gs * Th - gw * Bh;
            vec3 faceN = Nh * (uH >= 0.0 ? 1.0 : -1.0);
            vec3 wallN = length(gWorld) > 1e-4 ? normalize(gWorld) : faceN;
            vec3 nl = face ? faceN : wallN;
            float dif = clamp(dot(nl, uLight), 0.0, 1.0);
            float hv = clamp(dot(nl, -dirH), 0.0, 1.0);
            vec3 letter;
            if (face) {
                letter = uFace * (0.9 + 1.4 * dif) + uWall * 0.15;
                float band = 1.0 - smoothstep(0.5, 0.8, covH);
                letter = mix(letter, uEdge, band * 0.8);
            } else {
                float hl = pow(dif, 3.0);
                letter = mix(uWall * (0.7 + 0.6 * dif), uEdge, hl * 0.8);
                float stripe = 0.5 + 0.5 * sin(uH * uStripeFreq);
                letter *= 1.0 - uStripeAmt * 0.5 * stripe;
                letter = mix(letter, uFringe, pow(1.0 - hv, 3.0) * 0.45);
            }
            letter *= atten;
            inner = letter;
            if (uDisp > 0.0) {
                inner.r = insideLetter(qh + (rR - rG) * total, phi, arcK) ? letter.r : interiorC.r;
                inner.b = insideLetter(qh + (rB - rG) * total, phi, arcK) ? letter.b : interiorC.b;
            }
        }

        float lit = dot(n, uLight);
        inner *= mix(0.45, 1.0, smoothstep(-0.2, 0.6, lit));

        vec3 refl = reflect(rd, n);
        float spec = pow(max(dot(refl, uLight), 0.0), 220.0);
        col = inner * (1.0 - F) + F * envRefl(refl);
        col += vec3(spec * uSpec * 3.0);
        col += vec3(smoothstep(0.982, 0.995, dot(refl, normalize(vec3(-0.35, 0.9, 0.45)))) * uStreak * 0.6);

        float sw = smoothstep(0.35, 0.9, dot(n, N)) * smoothstep(0.6, 0.98, abs(N.x)) * mix(0.6, 1.0, step(0.0, N.x));
        vec3 film = 0.5 + 0.5 * cos(TAU * (ndv * 1.7 + arc * 1.3 + vec3(0.0, 0.33, 0.67)));
        vec3 sheenC = mix(uSheen, film, uIrid);
        col = mix(col, sheenC, clamp(sw * uSheenAmt * 0.7, 0.0, 1.0));

        float rim = 1.0 - smoothstep(0.0, 0.07, ndv);
        col = mix(col, uRim * 0.6, rim * 0.8);
        float shade = smoothstep(0.0, -0.6, lit) * (1.0 - ndv);
        col = mix(col, uRim * 0.3, shade * 0.45);

        float zf = smoothstep(-uR, uR, p.z);
        col *= 1.0 - uFarDim * (1.0 - zf);
    } else {
        col += uInterior * 2.0 * uHaze * exp(-max(minD, 0.0) / 0.017);
    }

    vec2 uvn = frag / uRes - 0.5;
    float vig = smoothstep(0.25, 0.75, length(uvn) * 1.2);
    col *= 1.0 - uVignette * vig * 0.85;
    float g = fract(sin(dot(frag + fract(uTime) * 137.0, vec2(12.9898, 78.233))) * 43758.5453) - 0.5;
    col += g * uGrain * 0.18;

    fragColor = vec4(clamp(col, 0.0, 1.0), 1.0);
}`;

const UNIFORMS = [
    "uRes", "uUnit", "uTheta", "uR", "uTube", "uK", "uCam", "uText", "uTextLen",
    "uGlyphH", "uDepth", "uBg", "uFace", "uWall", "uEdge", "uFringe", "uInterior",
    "uRim", "uSheen", "uSheenAmt", "uIrid", "uSpec", "uStreak", "uIor", "uDisp",
    "uBounces", "uStripeAmt", "uStripeFreq", "uHaze", "uFarDim", "uLight", "uSteps",
    "uInSteps", "uGrain", "uVignette", "uTime",
] as const;

function buildTextCanvas(text: string, weight: number, trackingPct: number) {
    const H = 128;
    const fs = 100;
    const c = document.createElement("canvas");
    const ctx = c.getContext("2d")!;
    const font = `${weight} ${fs}px Inter, "Helvetica Neue", Arial, sans-serif`;
    ctx.font = font;
    const str = (text && text.trim() ? text.toUpperCase() : "SEND HELLO SOS") + "  ";
    const track = (fs * trackingPct) / 100;
    const chars = Array.from(str);
    let total = 0;
    const adv = chars.map((ch) => {
        const a = ctx.measureText(ch).width + track;
        total += a;
        return a;
    });
    const cap = ctx.measureText("H").actualBoundingBoxAscent || fs * 0.72;
    const W = Math.min(4096, Math.max(64, Math.ceil(total)));
    c.width = W;
    c.height = H;
    ctx.fillStyle = "#000";
    ctx.fillRect(0, 0, W, H);
    ctx.font = font;
    ctx.fillStyle = "#fff";
    ctx.textBaseline = "alphabetic";
    try {
        ctx.filter = "blur(2px)";
    } catch (e) {
        // ignore
    }
    if (total > W) ctx.scale(W / total, 1);
    let x = track / 2;
    const y = H / 2 + cap / 2;
    chars.forEach((ch, i) => {
        ctx.fillText(ch, x, y);
        x += adv[i];
    });
    return { canvas: c, cap, W, H };
}

export interface ThickClearGlassProps {
    background?: string;
    baseColor?: string;
    text?: string;
    speed?: number;
    scale?: number;
    dispersion?: number;
    hoverGlow?: number;
    hoverSpeedBoost?: number;
    dragSensitivity?: number;
    advanced?: {
        coilRadius?: number;
        tubeRadius?: number;
        pitch?: number;
        startAngle?: number;
        turnMs?: number;
        cameraDistance?: number;
        letterHeight?: number;
        letterDepth?: number;
        tracking?: number;
        fontWeight?: number;
        faceColor?: string;
        edgeColor?: string;
        fringeColor?: string;
        interiorColor?: string;
        rimColor?: string;
        sheenColor?: string;
        sheen?: number;
        iridescence?: number;
        specular?: number;
        streak?: number;
        ior?: number;
        bounces?: number;
        striations?: number;
        stripeCount?: number;
        haze?: number;
        farDim?: number;
        lightAngle?: number;
        resolution?: number;
        marchSteps?: number;
        innerSteps?: number;
        grain?: number;
        vignette?: number;
    };
    style?: CSSProperties;
}

export function ThickClearGlass(props: ThickClearGlassProps) {
    const {
        text = "ZATHURA VENTURES",
        speed = 50,
        scale = 50,
        baseColor = "#00e5ff",
        dispersion = 50,
        background = "#020a14",
        hoverGlow = 100,
        hoverSpeedBoost = 100,
        dragSensitivity = 50,
        style,
    } = props;

    const wrapRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const propsRef = useRef<any>(null);
    const hoverTargetRef = useRef(0);
    const hoverAmtRef = useRef(0);
    const dragRef = useRef({ active: false, lastX: 0, delta: 0 });
    propsRef.current = {
        ...props,
        text,
        speed,
        scale,
        baseColor,
        dispersion,
        background,
        hoverGlow,
        hoverSpeedBoost,
        dragSensitivity,
    };

    useEffect(() => {
        const canvas = canvasRef.current;
        const wrap = wrapRef.current;
        if (!canvas || !wrap) return;
        const gl = canvas.getContext("webgl2", {
            antialias: false,
            alpha: false,
            premultipliedAlpha: false,
            preserveDrawingBuffer: true,
        }) as WebGL2RenderingContext | null;
        if (!gl) return;

        const compile = (type: number, src: string) => {
            const sh = gl.createShader(type)!;
            gl.shaderSource(sh, src);
            gl.compileShader(sh);
            if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
                const log = gl.getShaderInfoLog(sh);
                gl.deleteShader(sh);
                throw new Error("ThickClearGlass shader: " + log);
            }
            return sh;
        };
        const vs = compile(gl.VERTEX_SHADER, VERT);
        const fs = compile(gl.FRAGMENT_SHADER, FRAG);
        const prog = gl.createProgram()!;
        gl.attachShader(prog, vs);
        gl.attachShader(prog, fs);
        gl.bindAttribLocation(prog, 0, "aPos");
        gl.linkProgram(prog);
        if (!gl.getProgramParameter(prog, gl.LINK_STATUS))
            throw new Error("ThickClearGlass link: " + gl.getProgramInfoLog(prog));
        gl.deleteShader(vs);
        gl.deleteShader(fs);

        const loc: Record<string, WebGLUniformLocation> = {};
        for (const name of UNIFORMS) {
            const l = gl.getUniformLocation(prog, name);
            if (!l) throw new Error("ThickClearGlass: missing uniform " + name);
            loc[name] = l;
        }

        const vao = gl.createVertexArray();
        const buf = gl.createBuffer();
        gl.bindVertexArray(vao);
        gl.bindBuffer(gl.ARRAY_BUFFER, buf);
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW);
        gl.enableVertexAttribArray(0);
        gl.vertexAttribPointer(0, 2, gl.FLOAT, false, 0, 0);

        const tex = gl.createTexture();
        gl.bindTexture(gl.TEXTURE_2D, tex);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
        gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
        gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);

        let textKey = "";
        let textInfo = { cap: 72, W: 512, H: 128 };
        let dirty = true;
        const size = { w: wrap.offsetWidth || 1200, h: wrap.offsetHeight || 800 };
        const ro = new ResizeObserver(() => {
            size.w = wrap.offsetWidth || 1200;
            size.h = wrap.offsetHeight || 800;
            dirty = true;
        });
        ro.observe(wrap);

        const onPointerEnter = () => {
            hoverTargetRef.current = 1;
            dirty = true;
        };
        const onPointerLeave = () => {
            hoverTargetRef.current = 0;
            dirty = true;
        };
        const onPointerDown = (e: PointerEvent) => {
            dragRef.current.active = true;
            dragRef.current.lastX = e.clientX;
            dirty = true;
        };
        const onPointerMove = (e: PointerEvent) => {
            if (!dragRef.current.active) return;
            const dx = e.clientX - dragRef.current.lastX;
            dragRef.current.lastX = e.clientX;
            const sens = Math.max(0, Math.min(100, propsRef.current.dragSensitivity)) / 100;
            dragRef.current.delta += dx * sens * 0.012;
            dirty = true;
        };
        const onPointerUp = () => {
            dragRef.current.active = false;
        };
        wrap.addEventListener("pointerenter", onPointerEnter);
        wrap.addEventListener("pointerleave", onPointerLeave);
        wrap.addEventListener("pointerdown", onPointerDown);
        window.addEventListener("pointermove", onPointerMove);
        window.addEventListener("pointerup", onPointerUp);
        window.addEventListener("pointercancel", onPointerUp);

        let alive = true;
        const fontsReady = (document as any).fonts?.ready;
        if (fontsReady)
            fontsReady.then(() => {
                if (alive) textKey = "";
            });

        const reduce =
            typeof window !== "undefined" && window.matchMedia
                ? window.matchMedia("(prefers-reduced-motion: reduce)")
                : null;

        let raf = 0;
        let last = -1;
        let phase = 0;
        let lastKey = "";

        const frame = (now: number) => {
            raf = requestAnimationFrame(frame);
            const P = propsRef.current;
            const adv = { ...ADVANCED_DEFAULTS, ...(P.advanced ?? {}) };
            const dt = last < 0 ? 0 : Math.min((now - last) / 1000, 1 / 20);
            last = now;

            const rt = RenderTarget.current();
            const still =
                !!(reduce && reduce.matches) ||
                rt === RenderTarget.thumbnail ||
                rt === RenderTarget.export;
            const turnS = Math.max(0.5, adv.turnMs / 1000);
            const dragging = dragRef.current.active;
            const hoverTarget = dragging ? 0 : hoverTargetRef.current;
            hoverAmtRef.current += (hoverTarget - hoverAmtRef.current) * Math.min(1, dt * 6);
            const hoverAmt = hoverAmtRef.current;
            const speedBoost = 1 + hoverAmt * (Math.max(0, Math.min(100, P.hoverSpeedBoost)) / 100);
            const omega = (TAU / turnS) * (Math.max(0, Math.min(100, P.speed)) / 50) * speedBoost;
            if (still) phase = (TAU / turnS) * 2.32;
            else if (dragging) phase += dragRef.current.delta;
            else phase += omega * dt;
            dragRef.current.delta = 0;

            const tk = `${P.text}|${adv.fontWeight}|${adv.tracking}`;
            if (tk !== textKey) {
                textKey = tk;
                const built = buildTextCanvas(P.text, adv.fontWeight, adv.tracking);
                textInfo = built;
                gl.bindTexture(gl.TEXTURE_2D, tex);
                gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, built.canvas);
                dirty = true;
            }

            const dpr =
                Math.min(window.devicePixelRatio || 1, 2) *
                Math.max(0.2, Math.min(1, adv.resolution / 100));
            const cw = Math.max(1, Math.round(size.w * dpr));
            const ch = Math.max(1, Math.round(size.h * dpr));
            if (canvas.width !== cw || canvas.height !== ch) {
                canvas.width = cw;
                canvas.height = ch;
                dirty = true;
            }

            const animating =
                !still && (omega > 0 || dragging || Math.abs(hoverTarget - hoverAmt) > 0.001);
            if (!animating) {
                const k = JSON.stringify([
                    P.text, P.speed, P.scale, P.baseColor, P.dispersion, P.background,
                    P.hoverGlow, P.hoverSpeedBoost, P.dragSensitivity, adv, cw, ch, phase,
                ]);
                if (k === lastKey && !dirty) return;
                lastKey = k;
            }
            dirty = false;

            const unit =
                Math.min(cw, ch / REF_ASPECT) * (Math.max(10, P.scale) / 100);
            const tube = adv.tubeRadius / 100;
            const capWorld = (adv.letterHeight / 100) * 2 * 0.92 * tube;
            const stripH = (capWorld * textInfo.H) / Math.max(1, textInfo.cap);
            const textLen = (textInfo.W / textInfo.H) * stripH;
            const depth = ((adv.letterDepth / 100) * capWorld) / 2;
            const az = (adv.lightAngle * Math.PI) / 180;
            const L = [Math.sin(az), Math.cos(az) * 0.8, 0.9];
            const ll = Math.hypot(L[0], L[1], L[2]);

            gl.viewport(0, 0, cw, ch);
            gl.useProgram(prog);
            gl.bindVertexArray(vao);
            gl.activeTexture(gl.TEXTURE0);
            gl.bindTexture(gl.TEXTURE_2D, tex);
            gl.uniform1i(loc.uText, 0);
            gl.uniform2f(loc.uRes, cw, ch);
            gl.uniform1f(loc.uUnit, unit);
            gl.uniform1f(loc.uTheta, (adv.startAngle * Math.PI) / 180 + phase);
            gl.uniform1f(loc.uR, adv.coilRadius / 100);
            gl.uniform1f(loc.uTube, tube);
            gl.uniform1f(loc.uK, Math.max(0.1, adv.pitch / 100) / TAU);
            gl.uniform1f(loc.uCam, Math.max(1.5, adv.cameraDistance / 100));
            gl.uniform1f(loc.uTextLen, textLen);
            gl.uniform1f(loc.uGlyphH, stripH);
            gl.uniform1f(loc.uDepth, depth);
            gl.uniform3fv(loc.uBg, parseColor(P.background, [0.008, 0.04, 0.08]));
            gl.uniform3fv(loc.uFace, parseColor(adv.faceColor, [0.024, 0.1, 0.416]));
            gl.uniform3fv(loc.uWall, parseColor(P.baseColor, [0.176, 0.369, 0.682]));
            gl.uniform3fv(loc.uEdge, parseColor(adv.edgeColor, [0.31, 0.847, 0.91]));
            gl.uniform3fv(loc.uFringe, parseColor(adv.fringeColor, [0.753, 0.251, 0.878]));
            gl.uniform3fv(loc.uInterior, parseColor(adv.interiorColor, [0.012, 0.047, 0.22]));
            gl.uniform3fv(loc.uRim, parseColor(adv.rimColor, [0.318, 0.404, 0.435]));
            gl.uniform3fv(loc.uSheen, parseColor(adv.sheenColor, [0.91, 0.925, 0.96]));
            const glow = 1 + hoverAmt * (Math.max(0, Math.min(100, P.hoverGlow)) / 100);
            gl.uniform1f(loc.uSheenAmt, Math.min(1, (adv.sheen / 100) * glow));
            gl.uniform1f(loc.uIrid, adv.iridescence / 100);
            gl.uniform1f(loc.uSpec, (adv.specular / 100) * glow);
            gl.uniform1f(loc.uStreak, Math.min(1, (adv.streak / 100) * glow));
            gl.uniform1f(loc.uIor, Math.max(1.05, adv.ior / 100));
            gl.uniform1f(loc.uDisp, (Math.max(0, Math.min(100, P.dispersion)) / 100) * 0.04);
            gl.uniform1f(loc.uBounces, Math.max(0, Math.min(2, Math.round(adv.bounces))))
            gl.uniform1f(loc.uStripeAmt, adv.striations / 100);
            gl.uniform1f(loc.uStripeFreq, (TAU * Math.max(1, adv.stripeCount)) / Math.max(1e-4, 2 * depth));
            gl.uniform1f(loc.uHaze, adv.haze / 100);
            gl.uniform1f(loc.uFarDim, Math.max(0, Math.min(1, adv.farDim / 100)));
            gl.uniform3f(loc.uLight, L[0] / ll, L[1] / ll, L[2] / ll);
            gl.uniform1f(loc.uSteps, Math.max(8, Math.min(96, adv.marchSteps)));
            gl.uniform1f(loc.uInSteps, Math.max(4, Math.min(48, adv.innerSteps)));
            gl.uniform1f(loc.uGrain, adv.grain / 100);
            gl.uniform1f(loc.uVignette, adv.vignette / 100);
            gl.uniform1f(loc.uTime, still ? 0 : now / 1000);
            gl.drawArrays(gl.TRIANGLES, 0, 3);
        };
        raf = requestAnimationFrame(frame);

        return () => {
            alive = false;
            cancelAnimationFrame(raf);
            ro.disconnect();
            wrap.removeEventListener("pointerenter", onPointerEnter);
            wrap.removeEventListener("pointerleave", onPointerLeave);
            wrap.removeEventListener("pointerdown", onPointerDown);
            window.removeEventListener("pointermove", onPointerMove);
            window.removeEventListener("pointerup", onPointerUp);
            window.removeEventListener("pointercancel", onPointerUp);
            gl.deleteTexture(tex);
            gl.deleteBuffer(buf);
            gl.deleteVertexArray(vao);
            gl.deleteProgram(prog);
        };
    }, []);

    return (
        <div
            ref={wrapRef}
            style={{
                position: "relative",
                width: "100%",
                height: "100%",
                overflow: "hidden",
                background,
                touchAction: dragSensitivity > 0 ? "pan-y" : undefined,
                cursor: dragSensitivity > 0 ? "grab" : undefined,
                ...style,
            }}
        >
            <canvas
                ref={canvasRef}
                style={{
                    position: "absolute",
                    inset: 0,
                    width: "100%",
                    height: "100%",
                    display: "block",
                }}
            />
        </div>
    );
}

/* ─────────────────────────────────────────────────────────────────────────────
   SpiralGlassSection: Straight Laser Beam + Central Box Entry + Left/Right Flanks
───────────────────────────────────────────────────────────────────────────── */
export default function SpiralGlassSection() {
    const containerRef = useRef<HTMLDivElement>(null);
    const boxRef = useRef<HTMLDivElement>(null);
    const [beamLength, setBeamLength] = useState<number>(380);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"],
    });

    // Fade cleanly as user scrolls through the section
    const opacity = useTransform(scrollYProgress, [0, 0.45, 0.88], [1, 1, 0]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, 0.95]);
    const beamPulse = useTransform(scrollYProgress, [0, 0.3, 0.7], [1, 0.85, 0.2]);

    // Measure exact distance from section top to central box top for seamless laser connection
    useEffect(() => {
        const updateBeamLength = () => {
            if (containerRef.current && boxRef.current) {
                const cRect = containerRef.current.getBoundingClientRect();
                const bRect = boxRef.current.getBoundingClientRect();
                const dist = bRect.top - cRect.top;
                if (dist > 50) {
                    setBeamLength(dist);
                }
            }
        };
        updateBeamLength();
        window.addEventListener("resize", updateBeamLength);
        const timer = setTimeout(updateBeamLength, 600);
        return () => {
            window.removeEventListener("resize", updateBeamLength);
            clearTimeout(timer);
        };
    }, []);

    return (
        <section
            ref={containerRef}
            id="spiral-core"
            className="relative w-full min-h-[125vh] overflow-hidden bg-[#010612] flex flex-col items-center justify-start pt-4 pb-24 px-4 sm:px-6 lg:px-12"
        >
            {/* ── Keyframe styles for beam and receptor animations ── */}
            <style>{`
                @keyframes beam-flow-down {
                    0% { transform: translateY(-100%); opacity: 0; }
                    20% { opacity: 1; }
                    80% { opacity: 1; }
                    100% { transform: translateY(100%); opacity: 0; }
                }
                @keyframes energy-rise {
                    0% { transform: translateY(0) scale(0.6); opacity: 0; }
                    20% { opacity: 0.85; }
                    80% { opacity: 0.85; }
                    100% { transform: translateY(-120vh) scale(1.2); opacity: 0; }
                }
                @keyframes conduit-flow-left {
                    0% { transform: translateX(100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(-100%); opacity: 0; }
                }
                @keyframes conduit-flow-right {
                    0% { transform: translateX(-100%); opacity: 0; }
                    50% { opacity: 1; }
                    100% { transform: translateX(100%); opacity: 0; }
                }
                @keyframes receptor-pulse {
                    0%, 100% { transform: scale(1); opacity: 0.85; }
                    50% { transform: scale(1.2); opacity: 1; filter: drop-shadow(0 0 30px #00e5ff); }
                }
                @keyframes core-glow {
                    0%, 100% { opacity: 0.6; filter: blur(20px); }
                    50% { opacity: 0.95; filter: blur(28px); }
                }
            `}</style>

            {/* ── Ascending Quantum Energy Loop (Floating Upward toward Section 1) ── */}
            <div className="absolute inset-0 pointer-events-none overflow-hidden z-[5]">
                {[...Array(14)].map((_, i) => (
                    <div
                        key={i}
                        className="absolute rounded-full bg-[#00e5ff]"
                        style={{
                            width: `${(i % 3) + 2}px`,
                            height: `${(i % 3) + 2}px`,
                            left: `${12 + ((i * 19) % 76)}%`,
                            bottom: "-20px",
                            boxShadow: "0 0 12px #00e5ff",
                            opacity: 0.6,
                            animation: `energy-rise ${5 + (i % 4)}s linear infinite ${i * 0.45}s`,
                        }}
                    />
                ))}
            </div>

            {/* ── 1. The Continuous Straight Laser Beam Streaming Down From Section 1 All The Way Into The Box ── */}
            <motion.div
                style={{ opacity: beamPulse, height: beamLength }}
                className="absolute top-0 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex flex-col items-center w-16"
            >
                {/* Continuous Vertical Laser Beam Corridor stretching seamlessly from top seam into the box */}
                <div className="relative w-full h-full flex items-center justify-center overflow-hidden">
                    {/* Core Laser Needle (Volumetric Cinematic Thickness - Seamless edge at top) */}
                    <div
                        className="w-[7px] h-full bg-white"
                        style={{
                            boxShadow: "0 0 16px #ffffff, 0 0 35px #00e5ff, 0 0 70px #0077ff, 0 0 120px rgba(0, 229, 255, 0.9)",
                        }}
                    />
                    {/* Outer Volumetric Gaussian Glow Sheath */}
                    <div
                        className="absolute inset-0 w-24 -left-4"
                        style={{
                            background: "linear-gradient(to right, transparent, rgba(0,229,255,0.6), rgba(0,119,255,0.4), transparent)",
                            filter: "blur(16px)",
                        }}
                    />
                    {/* Rapid Downward Moving Cinematic Flash Wave Solitons */}
                    <div
                        className="absolute w-[9px] h-48 bg-white shadow-[0_0_45px_#ffffff]"
                        style={{
                            animation: "beam-flow-down 0.8s cubic-bezier(0.4, 0, 0.2, 1) infinite",
                        }}
                    />
                    <div
                        className="absolute w-[8px] h-36 bg-[#00e5ff] shadow-[0_0_35px_#00e5ff]"
                        style={{
                            animation: "beam-flow-down 1.2s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.35s",
                        }}
                    />
                    <div
                        className="absolute w-[7px] h-60 bg-gradient-to-b from-transparent via-white to-transparent shadow-[0_0_30px_#ffffff]"
                        style={{
                            animation: "beam-flow-down 0.6s linear infinite 0.15s",
                        }}
                    />
                </div>
            </motion.div>

            {/* Ambient Deep Blue Lightning Backlight */}
            <div
                className="absolute inset-0 pointer-events-none z-0"
                style={{
                    background: "radial-gradient(ellipse at 50% 35%, rgba(0, 229, 255, 0.12) 0%, rgba(0, 119, 255, 0.05) 50%, transparent 75%)",
                }}
            />

            {/* ── Section Header & Status Tag with Dedicated Central Optical Channel (Zero Beam Collision) ── */}
            <div className="relative z-10 w-full max-w-5xl mx-auto mt-10 mb-8 px-4">
                
                {/* 1. Status Telemetry Flanks (Left / Right flanking the central beam corridor) */}
                <div className="flex items-center justify-center w-full mb-5">
                    <div className="flex-1 flex justify-end pr-8 sm:pr-14">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#061226]/90 border border-[#00e5ff]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                            <span className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_8px_#00e5ff] animate-pulse" />
                            <span className="font-mono text-[9px] sm:text-[10px] text-[#00e5ff] uppercase tracking-[0.25em] font-bold">
                                Optical Reactor Core
                            </span>
                        </div>
                    </div>

                    {/* Central Optical Gap for Beam */}
                    <div className="w-16 sm:w-24 md:w-32 shrink-0 pointer-events-none" />

                    <div className="flex-1 flex justify-start pl-8 sm:pl-14">
                        <div className="inline-flex items-center gap-2 px-3 sm:px-4 py-1 rounded-full bg-[#061226]/90 border border-[#00e5ff]/40 backdrop-blur-md shadow-[0_0_20px_rgba(0,229,255,0.2)]">
                            <span className="font-mono text-[9px] sm:text-[10px] text-[#00e5ff] uppercase tracking-[0.25em] font-bold">
                                Continuous Loop Active
                            </span>
                            <span className="w-2 h-2 rounded-full bg-[#38bdf8] shadow-[0_0_8px_#38bdf8] animate-ping" />
                        </div>
                    </div>
                </div>

                {/* 2. Main Headline: Split 2-Wing Architecture with Dedicated Central Gap */}
                <div className="flex items-center justify-center w-full">
                    {/* Left Wing */}
                    <div className="flex-1 text-right pr-6 sm:pr-10 md:pr-14">
                        <h2 className="font-sans font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                            Engineering <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-[#a5f3fc]">Ultra-High</span>
                        </h2>
                    </div>

                    {/* Central Aperture for Laser Beam Corridor */}
                    <div className="w-16 sm:w-24 md:w-32 shrink-0 pointer-events-none flex flex-col items-center justify-center py-2">
                        <div className="w-full flex items-center justify-between text-[#00e5ff]/50 font-mono text-[10px] sm:text-xs">
                            <span>◂</span>
                            <span className="font-mono text-[9px] text-[#00e5ff]/60 tracking-widest hidden sm:inline">BEAM</span>
                            <span>▸</span>
                        </div>
                    </div>

                    {/* Right Wing */}
                    <div className="flex-1 text-left pl-6 sm:pl-10 md:pl-14">
                        <h2 className="font-sans font-light text-2xl sm:text-4xl md:text-5xl lg:text-6xl text-white tracking-tight leading-tight">
                            <span className="font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#a5f3fc] to-[#00e5ff]">Grade</span> Realities
                        </h2>
                    </div>
                </div>

                {/* 3. Subtitle / Architecture Mission Split Symmetrically */}
                <div className="flex items-start justify-center w-full mt-4">
                    <div className="flex-1 text-right pr-6 sm:pr-10 md:pr-14">
                        <p className="text-[#8eaec9] text-xs sm:text-sm font-light leading-relaxed">
                            Continuous downward energy feeds straight into our quantum circular matrix.
                        </p>
                    </div>

                    {/* Central Gap */}
                    <div className="w-16 sm:w-24 md:w-32 shrink-0 pointer-events-none" />

                    <div className="flex-1 text-left pl-6 sm:pl-10 md:pl-14">
                        <p className="text-[#8eaec9] text-xs sm:text-sm font-light leading-relaxed">
                            Distributing instantaneous compute to institutional web & enterprise systems.
                        </p>
                    </div>
                </div>

            </div>

            {/* ── 3-Column Architectural Flanks + Central Circular Component ── */}
            <motion.div
                style={{ opacity, scale }}
                className="relative z-10 w-full max-w-[1520px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center"
            >
                {/* ── LEFT FLANK: High-Grade Websites & Client-Facing Spatial Systems ── */}
                <div className="lg:col-span-3 flex flex-col gap-4 order-2 lg:order-1 relative">
                    {/* Optical Bus Conduit Connector from Central Box to Left Flank */}
                    <div className="hidden lg:flex items-center gap-2 absolute -right-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-r from-transparent to-[#00e5ff]/60 pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-[#00e5ff] shadow-[0_0_10px_#00e5ff] animate-ping" />
                    </div>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#00e5ff]/10 border border-[#00e5ff]/30 w-fit mb-1 shadow-[0_0_15px_rgba(0,229,255,0.15)]">
                        <Cpu size={15} className="text-[#00e5ff]" />
                        <span className="font-mono text-[11px] text-[#00e5ff] uppercase tracking-wider font-bold">
                            High-Grade Websites
                        </span>
                    </div>

                    {/* Card 1 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#00e5ff]/35">
                                <Zap size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Next.js 16 & GPU WebGL</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            Sub-10ms TTFB, bespoke GLSL shaders, 99+ Core Web Vitals, and instantaneous hydration for flawless consumer experiences.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#0077ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#0077ff]/35">
                                <ShieldCheck size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Zero-Trust Web Security</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            End-to-end cryptographic integrity, automated penetration defenses, and hardened distributed edge delivery.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#00e5ff]/35">
                                <Layers size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Kinetic Spatial Physics</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            60+ FPS hardware acceleration, fluid responsive ergonomics, and sensory digital craftsmanship.
                        </p>
                    </div>
                </div>

                {/* ── CENTER: Circular Component Box with Laser Beam Plunging In Directly ── */}
                <div className="lg:col-span-6 flex flex-col items-center justify-center order-1 lg:order-2 relative">
                    {/* Central Box Container holding the circular component */}
                    <div
                        ref={boxRef}
                        className="relative w-full h-[540px] sm:h-[630px] rounded-3xl overflow-hidden border-2 border-[#00e5ff]/50 shadow-[0_25px_100px_rgba(0,119,255,0.4),0_0_60px_rgba(0,229,255,0.3)] bg-[#010612]/95 backdrop-blur-md"
                    >
                        {/* ── BEAM ENTRY RECEPTOR COLLAR (Direct Beam Entry Point on Top Boundary of Box) ── */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 z-30 flex flex-col items-center pointer-events-none">
                            {/* Expanding Pulse Ring */}
                            <div className="w-28 h-8 rounded-full border border-[#00e5ff] shadow-[0_0_30px_#00e5ff] animate-ping opacity-80" />
                            
                            {/* High-tech Strike Collar */}
                            <div className="w-24 h-5 -mt-2.5 rounded-full bg-gradient-to-r from-[#0077ff] via-white to-[#0077ff] border-2 border-[#00e5ff] shadow-[0_0_40px_#00e5ff,0_0_70px_#0077ff] flex items-center justify-center">
                                {/* Superheated White-Hot Strike Node */}
                                <div className="w-6 h-6 rounded-full bg-white shadow-[0_0_30px_#ffffff,0_0_60px_#00e5ff] animate-pulse" />
                            </div>
                        </div>

                        {/* ── INTERNAL ENERGY CASCADE: Beam plunging deep into the circular matrix ── */}
                        <div
                            className="absolute top-0 left-1/2 -translate-x-1/2 w-56 h-72 bg-gradient-to-b from-[#00e5ff]/50 via-[#0077ff]/25 to-transparent blur-2xl pointer-events-none z-10"
                            style={{ animation: "core-glow 3s ease-in-out infinite" }}
                        />
                        {/* White-hot laser filament descending directly to the epicenter of the circular text */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[3.5px] h-48 bg-gradient-to-b from-white via-[#00e5ff] to-transparent shadow-[0_0_30px_#00e5ff,0_0_60px_#0077ff] pointer-events-none z-10" />

                        {/* Epicenter Energy Shockwave Ring inside the box */}
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full border border-[#00e5ff]/40 shadow-[0_0_50px_rgba(0,229,255,0.25)] pointer-events-none z-10 animate-pulse" />

                        {/* Circular Typography Engine (ThickClearGlass Matrix) */}
                        <ThickClearGlass
                            text="ZATHURA VENTURES"
                            baseColor="#00e5ff"
                            background="#010612"
                            speed={55}
                            scale={56}
                            dispersion={70}
                            hoverGlow={100}
                            hoverSpeedBoost={80}
                            dragSensitivity={65}
                            style={{ width: "100%", height: "100%" }}
                        />

                        {/* Edge lighting rings */}
                        <div className="absolute inset-0 rounded-3xl border border-[#00e5ff]/30 pointer-events-none" />
                        
                        {/* Smooth Fade Overlays for seamless top and bottom edges */}
                        <div className="absolute top-0 left-0 right-0 h-24 bg-gradient-to-b from-[#010612] to-transparent pointer-events-none z-10" />
                        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#010612] via-[#010612]/80 to-transparent pointer-events-none z-10" />

                        {/* Bottom interactive hint */}
                        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 pointer-events-none flex items-center gap-2">
                            <span className="font-mono text-[9px] uppercase tracking-[0.25em] text-[#00e5ff]/80 px-4 py-1.5 rounded-full bg-[#061226]/90 border border-[#00e5ff]/35 shadow-[0_0_20px_rgba(0,229,255,0.25)] backdrop-blur-md">
                                Circular Matrix Powered · Drag to Rotate
                            </span>
                        </div>
                    </div>

                    {/* ── Downward Energy Conduit Exiting Central Box into Section 3 (Volumetric Cinematic Beam) ── */}
                    <div className="relative w-14 h-32 flex flex-col items-center justify-start overflow-hidden pointer-events-none mt-2">
                        {/* Core Laser Needle */}
                        <div
                            className="w-[6px] h-full bg-white rounded-full"
                            style={{
                                boxShadow: "0 0 16px #ffffff, 0 0 35px #00e5ff, 0 0 70px #0077ff, 0 0 100px rgba(0, 229, 255, 0.8)",
                            }}
                        />
                        {/* Volumetric Plasma Halo */}
                        <div
                            className="absolute inset-0 w-16 -left-1 bg-gradient-to-b from-[#00e5ff]/55 via-[#0077ff]/35 to-transparent blur-lg"
                        />
                        {/* Downward Surging Solitons */}
                        <div
                            className="absolute w-[8px] h-20 bg-white rounded-full shadow-[0_0_30px_#ffffff]"
                            style={{ animation: "beam-flow-down 0.9s cubic-bezier(0.4, 0, 0.2, 1) infinite" }}
                        />
                        <div
                            className="absolute w-[7px] h-16 bg-[#00e5ff] rounded-full shadow-[0_0_25px_#00e5ff]"
                            style={{ animation: "beam-flow-down 1.3s cubic-bezier(0.4, 0, 0.2, 1) infinite 0.4s" }}
                        />
                    </div>
                </div>

                {/* ── RIGHT FLANK: Enterprise Software & High-Grade Applications ── */}
                <div className="lg:col-span-3 flex flex-col gap-4 order-3 relative">
                    {/* Optical Bus Conduit Connector from Central Box to Right Flank */}
                    <div className="hidden lg:flex items-center gap-2 absolute -left-8 top-1/2 -translate-y-1/2 w-8 h-[2px] bg-gradient-to-l from-transparent to-[#0077ff]/60 pointer-events-none">
                        <div className="w-2 h-2 rounded-full bg-[#0077ff] shadow-[0_0_10px_#0077ff] animate-ping" />
                    </div>

                    <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#0077ff]/10 border border-[#0077ff]/35 w-fit mb-1 shadow-[0_0_15px_rgba(0,119,255,0.2)]">
                        <Terminal size={15} className="text-[#00e5ff]" />
                        <span className="font-mono text-[11px] text-[#00e5ff] uppercase tracking-wider font-bold">
                            Enterprise Applications
                        </span>
                    </div>

                    {/* Card 1 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#0077ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#0077ff]/35">
                                <Cloud size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Distributed Cloud Scale</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            Multi-region Kubernetes clusters, real-time WebSocket pipelines, and zero-downtime rolling enterprise deployments.
                        </p>
                    </div>

                    {/* Card 2 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#00e5ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#00e5ff]/35">
                                <Sparkles size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Cognitive AI Integrations</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            Fine-tuned LLM agents, vector knowledge retrieval, and autonomous algorithmic processing for exponential business velocity.
                        </p>
                    </div>

                    {/* Card 3 */}
                    <div className="p-5 rounded-2xl bg-[#061226]/80 border border-[#00e5ff]/25 backdrop-blur-xl shadow-lg hover:border-[#00e5ff]/60 hover:shadow-[0_0_30px_rgba(0,229,255,0.2)] transition-all group">
                        <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-[#0077ff]/15 flex items-center justify-center text-[#00e5ff] border border-[#0077ff]/35">
                                <Activity size={16} />
                            </div>
                            <h4 className="font-sans font-semibold text-white text-sm">Mission-Critical Resilience</h4>
                        </div>
                        <p className="font-sans text-xs text-[#8eaec9] font-light leading-relaxed">
                            99.99% high-availability SLA, automated failover routines, and institutional-grade database synchronization.
                        </p>
                    </div>
                </div>
            </motion.div>
        </section>
    );
}
