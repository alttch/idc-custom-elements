import { DispatchWithoutAction } from "react";

export enum IDCPropertyKind {
  Number = "number",
  SelectNumber = "select_number",
  SelectNumberSlider = "select_number_slider",
  String = "string",
  Formula = "formula",
  StringList = "string_list",
  SelectString = "select_string",
  SelectDatabase = "select_database",
  SelectServerOID = "select_server_oid",
  SelectColor = "select_color",
  Boolean = "boolean",
  OID = "oid",
  OIDSubscribed = "oid_subscribed",
  ValueMap = "value_map",
  ValueColorMap = "value_color_map"
}

type viewer = ({
  kind,
  dragged,
  vendored,
  setVariable,
  getVariable,
  forceUpdate,
  ...params
}: {
  kind: string;
  dragged: boolean;
  vendored?: any;
  setVariable: (name: string, value: string) => void;
  getVariable: (name: string) => string | undefined;
  forceUpdate: DispatchWithoutAction;
}) => JSX.Element;

const uuidv4 = (window as any).$eva.external.uuidv4;

export class IDCElementCollection {
  elements: Map<string, any>;
  constructor() {
    this.elements = new Map();
  }
  add(element: IDCElement) {
    this.elements.set(element.val_class_name, {
      vendored: element.val_vendored,
      description: element.val_description,
      group: element.val_group,
      IconDraw: element.val_IconDraw,
      defaults: element.val_defaults,
      props: element.val_props,
      default_size: element.val_default_size,
      default_zIndex: element.val_default_zindex,
      boxed: element.val_boxed,
      actions: element.val_actions,
      Viewer: element.val_Viewer
    });
  }
  export(): Map<string, any> {
    return this.elements;
  }
}

export class IDCElement {
  val_class_name: string;
  val_description: string;
  val_group: string;
  val_IconDraw: () => JSX.Element | null;
  val_defaults: any;
  val_props: any[];
  val_default_size: { x: number; y: number };
  val_boxed: boolean;
  val_actions: boolean;
  val_Viewer: viewer;
  val_vendored: any;
  val_default_zindex: number;

  constructor(class_name: string, viewer: viewer) {
    this.val_class_name = class_name;
    this.val_description = class_name;
    this.val_group = "Extra";
    this.val_IconDraw = () => null;
    this.val_defaults = {};
    this.val_props = [];
    this.val_default_size = { x: 20, y: 20 };
    this.val_boxed = true;
    this.val_actions = false;
    this.val_Viewer = viewer;
    this.val_vendored = null;
    this.val_default_zindex = 10;
  }
  description(description: string) {
    this.val_description = description;
    return this;
  }
  defaultZIndex(zindex: number) {
    this.val_default_zindex = zindex;
    return this;
  }
  group(group: string) {
    this.val_group = group;
    return this;
  }
  iconDraw(IconDraw: () => JSX.Element) {
    this.val_IconDraw = IconDraw;
    return this;
  }
  defaultSize(x: number, y: number) {
    this.val_default_size = { x, y };
    return this;
  }
  boxed(boxed: boolean) {
    this.val_boxed = boxed || false;
    return this;
  }
  actions(actions: boolean) {
    this.val_actions = actions || false;
    return this;
  }
  defaultValue(name: string, value: any) {
    this.val_defaults[name] = value;
    return this;
  }
  prop(name: string, kind: IDCPropertyKind, params?: any) {
    this.val_props.push({ id: uuidv4(), name, kind, params });
    return this;
  }
  vendored(vendored: any) {
    this.val_vendored = vendored;
    return this;
  }
  export(): Map<string, any> {
    const collection = new IDCElementCollection();
    collection.add(this);
    return collection.export();
  }
}
