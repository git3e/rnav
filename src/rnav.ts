import * as d3 from "d3";
import { describeSector } from "./buns";

/*
* GUI
* */

class GUI {
  paper: any;
  nav: any;
  public constructor(buttons: any) {
    this.paper = d3
      .select("body")
      .append("svg")
      .attr("width", window.innerWidth)
      .attr("height", window.innerHeight)
      .on("mousedown", () => {
        this.nav.show(d3.event.clientX, d3.event.clientY);
      })
      .on("mouseup", () => {
        this.nav.hide();
      });

    this.nav = new RadialNav(this.paper, buttons);

    this._bindEvents();
  }

  private _bindEvents() {
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
  container: any;
  public constructor(paper: any, buttons: any) {
    this.size = 300;
    this.c = this.size / 2;
    this.r = this.size * 0.12;
    this.r2 = this.size * 0.3;
    this.angle = 360 / buttons.length;
    this.area = paper.append("svg").attr("class", "radialNav");
    this.container = this.area
        .append("g")
        .attr("transform-origin", "center center")
        .attr("transform", "scale(0)");
    this.updateButtons(buttons);
  }

  // private _sector = () => {
  //   this.area
  //     .append("path")
  //     .attr("class", "radialnav-sector")
  //     .attr(
  //       "d",
  //       describeSector(this.c, this.c, this.r, this.r2, 0, this.angle)
  //     );
  // }

  private _button = (btn: any, i: number) => {
    const describeVal = describeSector(
      this.c,
      this.c,
      this.r,
      this.r2,
      0,
      this.angle
    );

    const describeValHover = describeSector(
      this.c,
      this.c,
      this.r,
      this.r2 - 10,
      0,
      this.angle
    );

    this.container
      .append("g")
      .attr("transform", `rotate(${this.angle * i}, ${this.c}, ${this.c})`)
      .on("mouseover", function(this: any) {
        d3.select(this).selectAll("*").classed("active", true);
      })
      .on("mouseleave", function(this: any) {
        d3.select(this).selectAll("*").classed("active", false);
      })
      .append("path")
      .attr("class", "radialnav-sector")
      .attr("d", describeVal)
      .each(function(this: any) {
        d3
          .select(this)
          .on("mouseover", function(this: any) {
            d3.select(this).attr("d", describeValHover);
          })
          .on("mouseleave", function(this: any) {
            d3.select(this).attr("d", describeVal);
          });
      });
  };

  public updateButtons(buttons: any) {
    this.container.selectAll("*").remove();
    return buttons.map((btn: any, i: number) => {
      this._button(btn, i);
    });
  }

  public show(cx: number, cy: number) {
    this.area.attr("x", cx - this.c).attr("y", cy - this.c);
    this.container.transition().attr("transform", "scale(1)");
  }

  public hide() {
    this.container.transition(1).attr("transform", "scale(0)");
  }
}

let gui = new GUI([
  {
    icon: "create",
    action: () => console.log("Created...")
  },
  {
    icon: "connect",
    action: () => console.log("Connect...")
  },
  {
    icon: "disconnect",
    action: () => console.log("Disconect...")
  },
  {
    icon: "create",
    action: () => console.log("Created...")
  },
  {
    icon: "connect",
    action: () => console.log("Connect...")
  }
]);
