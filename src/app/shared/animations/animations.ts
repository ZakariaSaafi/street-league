import { trigger, transition, style, animate, query, stagger, keyframes } from "@angular/animations"

export const fadeAnimation = trigger("fadeAnimation", [
  transition(":enter", [style({ opacity: 0 }), animate("300ms ease-out", style({ opacity: 1 }))]),
  transition(":leave", [animate("200ms ease-in", style({ opacity: 0 }))]),
])

export const slideInAnimation = trigger("slideInAnimation", [
  transition(":enter", [
    style({ transform: "translateY(20px)", opacity: 0 }),
    animate("300ms ease-out", style({ transform: "translateY(0)", opacity: 1 })),
  ]),
  transition(":leave", [animate("200ms ease-in", style({ transform: "translateY(20px)", opacity: 0 }))]),
])

export const listAnimation = trigger("listAnimation", [
  transition("* => *", [
    query(
      ":enter",
      [
        style({ opacity: 0, transform: "translateY(20px)" }),
        stagger("100ms", [animate("300ms ease-out", style({ opacity: 1, transform: "translateY(0)" }))]),
      ],
      { optional: true },
    ),
  ]),
])

export const pulseAnimation = trigger("pulseAnimation", [
  transition("* => *", [
    animate(
      "1s ease-in-out",
      keyframes([
        style({ transform: "scale(1)", offset: 0 }),
        style({ transform: "scale(1.05)", offset: 0.5 }),
        style({ transform: "scale(1)", offset: 1 }),
      ]),
    ),
  ]),
])

export const bounceAnimation = trigger("bounceAnimation", [
  transition("* => *", [
    animate(
      "0.5s ease-in-out",
      keyframes([
        style({ transform: "translateY(0)", offset: 0 }),
        style({ transform: "translateY(-10px)", offset: 0.5 }),
        style({ transform: "translateY(0)", offset: 1 }),
      ]),
    ),
  ]),
])

export const rotateAnimation = trigger("rotateAnimation", [
  transition("* => *", [
    animate(
      "0.5s ease-in-out",
      keyframes([style({ transform: "rotate(0deg)", offset: 0 }), style({ transform: "rotate(360deg)", offset: 1 })]),
    ),
  ]),
])
