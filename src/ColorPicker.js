// https://codesandbox.io/s/wkx3r7y6q7?from-embed
// https://www.npmjs.com/package/react-color-picker-text
// https://medium.com/@tariqul.islam.rony/color-picker-by-react-js-and-react-color-775aab6bd7e9
import React from "react";
import $ from "jquery";
import Popper from "popper.js";
import {
  ChromePicker,
  SketchPicker,
  PhotoshopPicker,
  GithubPicker,
  TwitterPicker,
  SwatchesPicker,
  CompactPicker
} from "react-color";

export class ColorPicker extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      displayColorPicker: false,
      changeColor: this.props.defaultColor || "#9999999",
      color: this.props.color
    };
  }
  componentDidMount() {
    // Jquery here $(...)...
    $(function() {
      $('[data-toggle="tooltip"]').tooltip();
    });
  }
  onHandleShowColorPicker = () => {
    this.setState({ displayColorPicker: true });
  };
  onHandleCloseColorPicker = () => {
    this.setState({ displayColorPicker: false });
  };

  onChangeColorPicker = color => {
    this.setState({ color: color.rgb, changeColor: color.hex });
    this.props.onColorChange(color, this.props.palleteKey);
  };

  generatePickerByType = type => {
    if (type === "Chrome") {
      return (
        <ChromePicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Sketch") {
      return (
        <SketchPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Photoshop") {
      return (
        <PhotoshopPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Github") {
      return (
        <GithubPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Twitter") {
      return (
        <TwitterPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Swatches") {
      return (
        <SwatchesPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else if (type === "Compact") {
      return (
        <CompactPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    } else {
      return (
        <SketchPicker
          color={this.state.color}
          onChange={this.onChangeColorPicker}
        />
      );
    }
  };

  render() {
    return (
      <div className={"color-picker-container"}>
        {/* <div style={this.props.labelStyle || this.props.defaultLabelStyle} /> */}
        <div
          style={{
            backgroundColor: this.state.changeColor || this.props.defaultColor
          }}
          className={"color-picker-color-background"}
        />
        <div className={"color-text-with-popup"}>
          <input
            data-toggle="tooltip"
            data-placement="top"
            title="Click to change color"
            readOnly
            style={
              this.props.colorTextBoxStyle ||
              this.props.defaultColorTextBoxStyle
            }
            className={"color-picker-text"}
            type="text"
            name="color-picker-text"
            value={this.state.changeColor}
            onClick={() => this.onHandleShowColorPicker()}
          />
          {this.state.displayColorPicker && (
            <div className={"color-picker-palette"}>
              <div
                className={"color-picker-cover"}
                onClick={() => this.onHandleCloseColorPicker()}
              />
              {this.generatePickerByType(this.props.pickerType || "Sketch")}
            </div>
          )}
        </div>
      </div>
    );
  }
}

ColorPicker.defaultProps = {
  defaultTitle: "Color Picker",
  defaultLabelStyle: {
    paddingBottom: "7px",
    fontSize: "11px"
  },
  defaultColorTextBoxStyle: {
    height: "35px",
    width: "150px",
    border: "none",
    paddingLeft: "65px"
  }
};

export default ColorPicker;
