import * as d3 from "d3";
import { describeSector } from "./buns";
import { NavButtons, MenuButtons } from "./interfaces";
import { leftMenuBtns, rNavBtns } from "./elements";

class GUI {
  paper: any;
  nav: any;
  public constructor(leftMenuBtns: MenuButtons, rNavBtns: NavButtons) {
    this.paper = d3
      .select("body")
      .append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight);

    this._resize();

    this.nav = new RadialNav(this.paper, rNavBtns);
  }

  private _resize() {
    window.addEventListener("resize", () =>
      this.paper
        .attr("width", window.innerWidth)
        .attr("height", window.innerHeight)
    );
  }
}

class RadialNav {
  size: number;
  c: number;
  r: number;
  r2: number;
  angle: number;
  area: any;
  button: any;
  public constructor(paper: any, buttons: any) {
    console.log(buttons);
    this.size = 300;
    this.c = this.size / 2;
    this.r = this.size * 0.12;
    this.r2 = this.size * 0.3;
    this.angle = 360 / buttons.length;
    this.area = paper.append("svg").classed("r-nav", true);
    this.createButton(buttons);
  }

  private _button(btn: any, i: number) {
    this.button = this.area
      .append("g")
      .attr("transform", `rotate(${this.angle * i}, ${this.c}, ${this.c})`);
    this.button
      .append("path")
      .attr(
        "d",
        describeSector(this.c, this.c, this.r, this.r2, 0, this.angle)
      );
  }

  public createButton(buttons: any) {
    return buttons.map((btn: any, i: number) => {
      this._button(btn, i);
    });
  }
}

new GUI(leftMenuBtns, rNavBtns);
