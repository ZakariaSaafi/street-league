import { Injectable, Renderer2, RendererFactory2 } from "@angular/core"
import { BehaviorSubject } from "rxjs"

export type ThemeMode = "light" | "dark"

@Injectable({
  providedIn: "root",
})
export class ThemeService {
  private renderer: Renderer2
  private themeSubject = new BehaviorSubject<ThemeMode>(this.getInitialTheme())
  public theme$ = this.themeSubject.asObservable()

  constructor(private rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null)
    this.applyTheme(this.themeSubject.value)
  }

  private getInitialTheme(): ThemeMode {
    const savedTheme = localStorage.getItem("theme") as ThemeMode
    if (savedTheme) {
      return savedTheme
    }

    // Check user preference
    return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"
  }

  toggleTheme(): void {
    const newTheme = this.themeSubject.value === "light" ? "dark" : "light"
    this.setTheme(newTheme)
  }

  setTheme(theme: ThemeMode): void {
    this.themeSubject.next(theme)
    localStorage.setItem("theme", theme)
    this.applyTheme(theme)
  }

  private applyTheme(theme: ThemeMode): void {
    const body = document.body
    if (theme === "dark") {
      this.renderer.addClass(body, "dark-theme")
      this.renderer.removeClass(body, "light-theme")
    } else {
      this.renderer.addClass(body, "light-theme")
      this.renderer.removeClass(body, "dark-theme")
    }
  }
}
