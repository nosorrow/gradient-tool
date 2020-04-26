import React from "react";
import hexToRgba from "hex-to-rgba";
import hexToRgbaExtends from "./hex-to-rgba-extends";
import ColorPicker from "./ColorPicker";
import Prism from "prismjs";
import randcolor from "./randomcolor";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fab } from "@fortawesome/free-brands-svg-icons";
import {
  faCheckSquare,
  faCoffee,
  faPlus,
  faTimes
} from "@fortawesome/free-solid-svg-icons";
library.add(fab, faCheckSquare, faCoffee, faPlus, faTimes);

const DEFAULTCOLOR = "#b30059";

class Gradient extends React.Component {
  constructor(props) {
    super(props);
    let defclr = randcolor();
    let defcolstr =
      this.props.defaultColor !== undefined ? this.props.defaultColor : defclr;
    let palettes = Array.from(Array(this.props.maxColor).keys());

    this.state = {
      palettes: palettes,
      palettesType: "Swatches",
      colors: [defcolstr],
      gradientColors: [hexToRgbaExtends(defcolstr)],
      rgbaString: [hexToRgba(defcolstr)]
    };

    if (this.props.maxColor && this.props.maxColor > 1) {
      let i = 0;
      while (i < this.props.maxColor - 1) {
        i += 1;
        let r = randcolor();
        this.state.colors.push(r);
        this.state.gradientColors.push(hexToRgbaExtends(r));
        this.state.rgbaString.push(hexToRgba(r));
      }
    }

    this.props.onColorPickerChange(this.state.rgbaString);
  }

  handleAddColorPallete = () => {
    if (this.state.palettes.length < this.props.maxColor) {
      let randcol = randcolor();
      this.state.gradientColors.push(hexToRgbaExtends(randcol));
      this.state.rgbaString.push(hexToRgba(randcol));
      this.state.colors.push(randcol);
      this.setState({
        palettes: [...this.state.palettes, ""],
        colors: this.state.colors,
        gradientColors: this.state.gradientColors,
        rgbaString: this.state.rgbaString
      });
    } else {
      let arr = Array.from(Array(this.props.maxColor).keys());

      this.setState({
        // TODO: count max
        // palettes: ["", "", "", "", ""],
        palettes: arr
      });
    }
    this.props.onColorPickerChange(this.state.rgbaString);
  };

  handleDeleteColorPallete = i => {
    if (i > 0) {
      this.state.palettes.splice(i, 1);
      this.state.gradientColors.splice(i, 1);
      this.state.rgbaString.splice(i, 1);
      this.state.colors.splice(i, 1);
      this.setState({
        palettes: this.state.palettes,
        colors: this.state.colors,
        gradientColors: this.state.gradientColors,
        rgbaString: this.state.rgbaString
      });
    } else {
      return;
    }
    this.props.onColorPickerChange(this.state.rgbaString);
  };

  handleChangePallete = () => {
    let paltype =
      this.state.palettesType === "Swatches" ? "Sketch" : "Swatches";
    this.setState({
      palettesType: paltype
    });
  };

  onColorPickerChange = (color, i) => {
    this.state.gradientColors[i] = color.rgb;
    let rgba = color.rgb;
    this.state.rgbaString[i] = `rgba(${rgba.r}, ${rgba.g},${rgba.b},${rgba.a})`;

    this.setState({
      gradientColors: this.state.gradientColors,
      rgbaString: this.state.rgbaString
    });
    this.props.onColorPickerChange(this.state.rgbaString);
  };

  render() {
    return (
      <div className="card">
        <div className="card-header">
          <div className="row">
            <div className="col-8">{this.props.gradientTitle}</div>
            {this.props.maxColor > 1 && (
              <div className="col-4 text-right">
                <button
                  type="button"
                  id="addcolor"
                  onClick={this.handleAddColorPallete}
                  className="btn btn-warning text-right"
                >
                  {/* <i className="fas fa-plus"></i> */}
                  <FontAwesomeIcon icon="plus" />
                </button>
              </div>
            )}
          </div>
        </div>
        <div className="card-body">
          <div className="row">
            <div className="col text-right">
              <h5>Change color picker</h5>
              <label className="switch">
                <input type="checkbox" onChange={this.handleChangePallete} />
                <span className="slider-check"></span>
              </label>
            </div>
          </div>
          <div className="gradient-color-wrapper">
            {this.state.palettes.map((el, i) => {
              return (
                <div key={i} id={i}>
                  <ColorPicker
                    onColorChange={this.onColorPickerChange}
                    palleteKey={i}
                    pickerType={this.state.palettesType}
                    defaultColor={
                      this.props.defaultColor || this.state.colors[i]
                    }
                    color={this.state.gradientColors[i]}
                  />

                  {i > 0 && (
                    <button
                      type="button"
                      className="delete-btn btn btn-outline-danger"
                      onClick={() => this.handleDeleteColorPallete(i)}
                    >
                      {/* <i className="fas fa-times"></i> */}
                      <FontAwesomeIcon icon="times" />
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  }
}

class RenderIcon extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      code: "",
      gradient: "",
      borderRadius: ""
    };
  }

  render() {
    let bgrRgba, txtBgr;
    let angle = this.props.gradientAngle ? this.props.gradientAngle : "-180deg";
    let radialType = this.props.radialType ? `${this.props.radialType},` : "";

    if (this.props.rgbaColors.length > 1) {
      if (this.props.gradientType === "linear") {
        bgrRgba = {
          // backgroundImage: "linear-gradient
          backgroundImage: `${
            this.props.gradientType
          }-gradient(${angle}, ${this.props.rgbaColors.join(",")})`
        };
        txtBgr = `${
          this.props.gradientType
        }-gradient(${angle}, ${this.props.rgbaColors.join(",")})`;
      } else {
        bgrRgba = {
          // backgroundImage: "radial-gradient
          backgroundImage: `${
            this.props.gradientType
          }-gradient(${radialType}${this.props.rgbaColors.join(",")})`
        };
        txtBgr = `${
          this.props.gradientType
        }-gradient(${radialType}${this.props.rgbaColors.join(",")})`;
      }
    } else {
      bgrRgba = { background: this.props.rgbaColors[0] || DEFAULTCOLOR };
      txtBgr = this.props.rgbaColors[0];
    }

    bgrRgba.borderRadius = this.props.borderRadius;

    const userGradient = {
      background: txtBgr,
      WebkitBackgroundClip: "text",
      backgroundClip: "text",
      color: "transparent"
    };
    return (
      <div>
        <div className="row text-center mt-5 mb-5">
          <div className="col">
            <h1 style={userGradient} className="text" key={txtBgr}>
              text gradient
            </h1>
          </div>
        </div>
        <div className="row">
          <div className="col text-center">
            <div className="box mb-5" style={bgrRgba}>
              <div
                className="box-iconstyle"
                style={{ color: this.props.rgbaIconColors[0] }}
              >
                <FontAwesomeIcon icon={["fab", "apple"]} />
              </div>
            </div>
            <div className="box mb-5" style={bgrRgba}>
              <div
                className="box-iconstyle"
                style={{ color: this.props.rgbaIconColors[0] }}
              >
                <FontAwesomeIcon icon={["fab", "chrome"]} />
              </div>
            </div>
            <div className="box mb-5" style={bgrRgba}>
              <div
                className="box-iconstyle"
                style={{ color: this.props.rgbaIconColors[0] }}
              >
                <FontAwesomeIcon icon={["fab", "cc-visa"]} />
              </div>
            </div>
            <div className="box mb-5" style={bgrRgba}>
              <div
                className="box-iconstyle"
                style={{ color: this.props.rgbaIconColors[0] }}
              >
                <FontAwesomeIcon icon={["fab", "app-store"]} />
              </div>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <RenderCode
              code={bgrRgba}
              iconColor={{ color: this.props.rgbaIconColors[0] }}
            />
          </div>
        </div>
      </div>
    );
  }
}

class RenderCode extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      css: "",
      code: this.props.code,
      html: `<div class="box">
  <i class="fab fa-apple"></i>
</div>

<!-- Text gradient -->
<h1 class="text">Hello</h1>
`
    };
  }

  componentDidMount() {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  componentDidUpdate() {
    setTimeout(() => Prism.highlightAll(), 0);
  }

  setCss = () => {
    let bgr;
    if (!this.props.code.backgroundImage) {
      bgr = `background: ${this.props.code.background};`;
    } else {
      bgr = `background-image: ${this.props.code.backgroundImage};`;
    }

    let textBgr = this.props.code.background || this.props.code.backgroundImage;
    let bradius = this.props.code.borderRadius
      ? `border-radius: ${this.props.code.borderRadius};`
      : "border-radius: 0";

    let css = `
.box {
  position: relative;
  width: 100px;
  height: 100px;
  margin: 0 auto;
  ${bgr}
  ${bradius}
}
    
i {
  position: absolute;
  font-size: 3em;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  color: ${this.props.iconColor.color};
}

/* Text gradient style */
.text {
  background: ${textBgr};
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-size: 10vw;
  font-family: 'Anton', sans-serif;
}
`;
    return css;
  };

  render() {
    let css = this.setCss();
    return (
      <div>
        <div className="row">
          <div className="col">
            <h5>HTML</h5>
            <pre className="line-numbers">
              <code className="language-html">{this.state.html.trim()}</code>
            </pre>
          </div>
        </div>
        <div className="row">
          <div className="col">
            <h5>CSS</h5>
            <pre className="line-numbers">
              <code className="language-css">{css.trim()}</code>
            </pre>
          </div>
        </div>
      </div>
    );
  }
}

class IconBorderRadius extends React.Component {
  handleRadius = e => {
    this.props.onChangeRadius(e.target.value);
  };

  render() {
    return (
      <div className="slidecontainer">
        <input
          type="range"
          min="0"
          max="50"
          className="slider"
          id="myRange"
          defaultValue="0"
          onChange={this.handleRadius}
        />
      </div>
    );
  }
}

class GradientSettings extends React.Component {
  handleDirection = e => {
    this.props.onChangeDirection(e.target.value);
  };
  handleGradientType = e => {
    this.props.onChangeGradientType(e.target.value);
  };

  handleRadialType = e => {
    this.props.onChangeRadialType(e.target.value);
  };

  render() {
    return (
      <div className="card mt-1">
        <div className="card-body">
          <div className="row">
            <div className="col">
              <h5>Turn on radial</h5>
              <label className="switch">
                <input type="checkbox" onChange={this.handleGradientType} />
                <span className="slider-check"></span>
              </label>
            </div>
            <div className="col">
              <h5>Turn on circle</h5>
              <label className="switch">
                <input type="checkbox" onChange={this.handleRadialType} />
                <span className="slider-check"></span>
              </label>
            </div>
          </div>
          <h5>Linear gradient angle</h5>

          <div className="slidecontainer">
            <input
              type="range"
              min="-180"
              max="180"
              className="slider"
              id="direcions"
              defaultValue="-180"
              onChange={this.handleDirection}
            />
          </div>
        </div>
      </div>
    );
  }
}

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rgbaGradientState: [],
      rgbaGradientIconState: [],
      bgrColorState: "",
      borderRadius: "",
      gradientAngle: "",
      gradientType: "linear",
      radialType: ""
    };
  }

  setGradientColors = colors => {
    this.setState({
      rgbaGradientState: colors
    });
  };

  setGradientIconColors = colors => {
    this.setState({
      rgbaGradientIconState: colors
    });
  };

  setBorderRadius = radius => {
    let borderRadius = radius === "0" ? radius : radius + "%";
    this.setState({
      borderRadius: borderRadius
    });
  };

  setGradientDirection = angle => {
    this.setState({
      gradientAngle: angle + "deg"
    });
  };

  setGradientType = t => {
    let type;
    type = this.state.gradientType === "linear" ? "radial" : "linear";

    this.setState({
      gradientType: type
    });
  };

  setRadialType = t => {
    let type;
    type = this.state.radialType === "" ? "circle" : "";
    this.setState({
      radialType: type
    });
  };

  render() {
    return (
      <div className="row">
        <div className="col-md-3">
          <Gradient
            onColorPickerChange={this.setGradientColors}
            maxColor={5}
            gradientTitle={"Background colors"}
          />
          <Gradient
            onColorPickerChange={this.setGradientIconColors}
            defaultColor={"#ffe6f2"}
            maxColor={1}
            gradientTitle={"Icon color"}
          />
          <GradientSettings
            onChangeDirection={this.setGradientDirection}
            onChangeGradientType={this.setGradientType}
            onChangeRadialType={this.setRadialType}
          />
          <h5 className="card-title">Border Radius</h5>
          <IconBorderRadius onChangeRadius={this.setBorderRadius} />
        </div>
        <div className="col-md-9 text-center">
          <RenderIcon
            rgbaColors={this.state.rgbaGradientState}
            rgbaIconColors={this.state.rgbaGradientIconState}
            borderRadius={this.state.borderRadius}
            gradientAngle={this.state.gradientAngle}
            gradientType={this.state.gradientType}
            radialType={this.state.radialType}
          />
        </div>
      </div>
    );
  }
}

export default App;
