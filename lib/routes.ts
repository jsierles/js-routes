 /*
File generated by js-routes RubyVariables.GEM_VERSION
Based on Rails RubyVariables.RAILS_VERSION routes of RubyVariables.APP_CLASS
 */

declare var RubyVariables: {
  PREFIX: string;
  NODE_TYPES: Record<string, number>;
  DEPRECATED_GLOBBING_BEHAVIOR: boolean;
  SPECIAL_OPTIONS_KEY: string;
  DEFAULT_URL_OPTIONS: Record<string, any>;
  SERIALIZER: (object: any) => string,
  NAMESPACE: string,
  ROUTES: any,
};

declare var exports: any
declare var define: undefined | (Function & {amd?: (args: any[], callback: () => any) => void});

type Configuration = {
  prefix: string,
  default_url_options: Record<string, any>,
  special_options_key: string,
  serializer: (object: any) => string
}

(function() {
  const hasProp = {}.hasOwnProperty;
let root: {jQuery? : {type(arg: any): string}} = typeof exports === "object" ? exports : this;


  class ParameterMissing extends Error {
    constructor(message: string) {
      super(message);
      Object.setPrototypeOf(this, Object.getPrototypeOf(this));
    };
  }


  const NodeTypes = RubyVariables.NODE_TYPES;

  const DeprecatedGlobbingBehavior = RubyVariables.DEPRECATED_GLOBBING_BEHAVIOR;

  const SpecialOptionsKey = RubyVariables.SPECIAL_OPTIONS_KEY;

  const UriEncoderSegmentRegex = /[^a-zA-Z0-9\-\._~!\$&'\(\)\*\+,;=:@]/g;

  const ReservedOptions = ['anchor', 'trailing_slash', 'subdomain', 'host', 'port', 'protocol'];

  const Utils = {
    configuration: {
      prefix: RubyVariables.PREFIX,
      default_url_options: RubyVariables.DEFAULT_URL_OPTIONS,
      special_options_key: RubyVariables.SPECIAL_OPTIONS_KEY,
      serializer: RubyVariables.SERIALIZER
    } as Configuration,

    default_serializer: function(object: any, prefix?: string): string {
      var element, i, key, prop, s, _i, _len;
      if (object == null) {
        return "";
      }
      if (!prefix && !(this.get_object_type(object) === "object")) {
        throw new Error("Url parameters should be a javascript hash");
      }
      s = [];
      switch (this.get_object_type(object)) {
        case "array":
          for (i = _i = 0, _len = object.length; _i < _len; i = ++_i) {
            element = object[i];
            s.push(this.default_serializer(element, prefix + "[]"));
          }
          break;
        case "object":
          for (key in object) {
            if (!hasProp.call(object, key)) continue;
            prop = object[key];
            if ((prop == null) && prefix) {
              prop = "";
            }
            if (prop != null) {
              if (prefix) {
                key = prefix + "[" + key + "]";
              }
              s.push(this.default_serializer(prop, key));
            }
          }
          break;
        default:
          if (object != null) {
            s.push((encodeURIComponent(prefix!.toString())) + "=" + (encodeURIComponent(object.toString())));
          }
      }
      if (!s.length) {
        return "";
      }
      return s.join("&");
    },
    serialize: function(object: any) {
      var custom_serializer = this.configuration.serializer;
      if ((custom_serializer != null) && this.get_object_type(custom_serializer) === "function") {
        return custom_serializer(object);
      } else {
        return this.default_serializer(object);
      }
    },
    clean_path: function(path: string) {
      const tokens = path.split("://");
      const last_index = tokens.length - 1;
      tokens[last_index] = tokens[last_index].replace(/\/+/g, "/");
      return tokens.join("://");
    },
    extract_options: function(number_of_params: number, args: object[]): Record<string, any> {
      const last_el = args[args.length - 1];
      if ((args.length > number_of_params && last_el === void 0) || ((last_el != null) && "object" === this.get_object_type(last_el) && !this.looks_like_serialized_model(last_el))) {
        const options: Record<string, any> = args.pop() || {};
        delete options[this.configuration.special_options_key];
        return options;
      } else {
        return {};
      }
    },
    looks_like_serialized_model: function(object: any): object is {id: any} | {to_param: any} {
      return !object[this.configuration.special_options_key] && ("id" in object || "to_param" in object);
    },
    path_identifier: function(object: 0 | Record<string, any>): string {
      if (object === 0) {
        return "0";
      }
      if (!object) {
        return "";
      }
      let property: any = object;
      if (this.get_object_type(object) === "object") {
        if ("to_param" in object) {
          if (object.to_param == null) {
            throw new ParameterMissing("Route parameter missing: to_param");
          }
          property = object.to_param;
        } else if ("id" in object) {
          if (object.id == null) {
            throw new ParameterMissing("Route parameter missing: id");
          }
          property = object.id;
        } else {
          property = object;
        }
        if (this.get_object_type(property) === "function") {
          property = property.call(object);
        }
      }
      return property.toString();
    },

    normalize_options: function(parts: string[], required_parts: string[], default_options: Record<string, any>, actual_parameters: any[]) {
      let options = this.extract_options(parts.length, actual_parameters);
      if (actual_parameters.length > parts.length) {
        throw new Error("Too many parameters provided for path");
      }
      let use_all_parts = actual_parameters.length > required_parts.length;
      const parts_options: Record<string, any> = {};
      for (const key in options) {
        const value = options[key]
        if (!hasProp.call(options, key)) continue;
        use_all_parts = true;
        if (this.indexOf(parts, key) >= 0) {
          parts_options[key] = value;
        }
      }
      options = {...this.configuration.default_url_options, ...default_options, ...options};
      const result: Record<string, any>  = {};
      const url_parameters: Record<string, any> = {};
      result['url_parameters'] = url_parameters;
      for (const key in options) {
        if (!hasProp.call(options, key)) continue;
        const value = options[key];
        if (this.indexOf(ReservedOptions, key) >= 0) {
          result[key] = value;
        } else {
          url_parameters[key] = value;
        }
      }
      const route_parts = use_all_parts ? parts : required_parts;
      let i = 0;
      for (const part of route_parts) {
        if (i < actual_parameters.length) {
          if (!parts_options.hasOwnProperty(part)) {
            url_parameters[part] = actual_parameters[i];
            ++i;
          }
        }
      }
      return result;
    },
    build_route: function(parts: any, required_parts: any, default_options: any, route: any, full_url: any, args: any) {
      var options, parameters, result, url, url_params;
      args = Array.prototype.slice.call(args);
      options = this.normalize_options(parts, required_parts, default_options, args);
      parameters = options['url_parameters'];
      result = "" + (this.get_prefix()) + (this.visit(route, parameters));
      url = Utils.clean_path(result);
      if (options['trailing_slash'] === true) {
        url = url.replace(/(.*?)[\/]?$/, "$1/");
      }
      if ((url_params = this.serialize(parameters)).length) {
        url += "?" + url_params;
      }
      url += options.anchor ? "#" + options.anchor : "";
      if (full_url) {
        url = this.route_url(options) + url;
      }
      return url;
    },
    visit: function(route: any, parameters: any, optional: boolean = false): string {
      var left, left_part, right, right_part, type, value;
      if (optional == null) {
        optional = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return this.visit(left, parameters, true);
        case NodeTypes.STAR:
          return this.visit_globbing(left, parameters, true);
        case NodeTypes.LITERAL:
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
          return left;
        case NodeTypes.CAT:
          left_part = this.visit(left, parameters, optional);
          right_part = this.visit(right, parameters, optional);
          if (optional && ((this.is_optional_node(left[0]) && !left_part) || ((this.is_optional_node(right[0])) && !right_part))) {
            return "";
          }
          return "" + left_part + right_part;
        case NodeTypes.SYMBOL:
          value = parameters[left];
          delete parameters[left];
          if (value != null) {
            return this.encode_segment(this.path_identifier(value));
          }
          if (optional) {
            return "";
          } else {
            throw new ParameterMissing("Route parameter missing: " + left);
          }
          break;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    encode_segment: function(segment: string): string {
      return segment.replace(UriEncoderSegmentRegex, function(str) {
        return encodeURIComponent(str);
      });
    },
    is_optional_node: function(node: string) {
      return this.indexOf([NodeTypes.STAR, NodeTypes.SYMBOL, NodeTypes.CAT], node) >= 0;
    },
    build_path_spec: function(route: any, wildcard: boolean = false): string {
      var left, right, type;
      if (wildcard == null) {
        wildcard = false;
      }
      type = route[0], left = route[1], right = route[2];
      switch (type) {
        case NodeTypes.GROUP:
          return "(" + (this.build_path_spec(left)) + ")";
        case NodeTypes.CAT:
          return "" + (this.build_path_spec(left)) + (this.build_path_spec(right));
        case NodeTypes.STAR:
          return this.build_path_spec(left, true);
        case NodeTypes.SYMBOL:
          if (wildcard === true) {
            return "" + (left[0] === '*' ? '' : '*') + left;
          } else {
            return ":" + left;
          }
          break;
        case NodeTypes.SLASH:
        case NodeTypes.DOT:
        case NodeTypes.LITERAL:
          return left;
        default:
          throw new Error("Unknown Rails node type");
      }
    },
    visit_globbing: function(route, parameters, optional) {
      var left, right, type, value;
      type = route[0], left = route[1], right = route[2];
      value = parameters[left];
      delete parameters[left];
      if (value == null) {
        return this.visit(route, parameters, optional);
      }
      value = (() => {
        switch (this.get_object_type(value)) {
          case "array":
            return value.join("/");
          default:
            return value;
        }
      }).call(this);
      if (DeprecatedGlobbingBehavior) {
        return this.path_identifier(value);
      } else {
        return encodeURI(this.path_identifier(value));
      }
    },
    get_prefix: function() {
      var prefix;
      prefix = this.configuration.prefix;
      if (prefix !== "") {
        prefix = (prefix.match("/$") ? prefix : prefix + "/");
      }
      return prefix;
    },
    route: function(parts_table, default_options, route_spec, full_url) {
      var part, parts, path_fn, required, required_parts, _i, _len, _ref;
      required_parts = [];
      parts = [];
      for (_i = 0, _len = parts_table.length; _i < _len; _i++) {
        _ref = parts_table[_i], part = _ref[0], required = _ref[1];
        parts.push(part);
        if (required) {
          required_parts.push(part);
        }
      }
      path_fn = function() {
        return Utils.build_route(parts, required_parts, default_options, route_spec, full_url, arguments);
      };
      path_fn.required_params = required_parts;
      path_fn.toString = function() {
        return Utils.build_path_spec(route_spec);
      };
      return path_fn;
    },
    route_url: function(route_defaults) {
      var hostname, port, protocol, subdomain;
      if (typeof route_defaults === 'string') {
        return route_defaults;
      }
      hostname = route_defaults.host || Utils.current_host();
      if (!hostname) {
        return '';
      }
      subdomain = route_defaults.subdomain ? route_defaults.subdomain + '.' : '';
      protocol = route_defaults.protocol || Utils.current_protocol();
      port = route_defaults.port || (!route_defaults.host ? Utils.current_port() : void 0);
      port = port ? ":" + port : '';
      return protocol + "://" + subdomain + hostname + port;
    },
    has_location: function() {
      return (typeof window !== "undefined" && window !== null ? window.location : void 0) != null;
    },
    current_host: function() {
      if (this.has_location()) {
        return window.location.hostname;
      } else {
        return null;
      }
    },
    current_protocol: function() {
      if (this.has_location() && window.location.protocol !== '') {
        return window.location.protocol.replace(/:$/, '');
      } else {
        return 'http';
      }
    },
    current_port: function() {
      if (this.has_location() && window.location.port !== '') {
        return window.location.port;
      } else {
        return '';
      }
    },
    _classToTypeCache: null,
    _classToType: function() {
      var name, _i, _len, _ref;
      const _classToTypeCache = {};
      _ref = "Boolean Number String Function Array Date RegExp Object Error".split(" ");
      for (_i = 0, _len = _ref.length; _i < _len; _i++) {
        name = _ref[_i];
        _classToTypeCache["[object " + name + "]"] = name.toLowerCase();
      }
      return _classToTypeCache;
    },
    get_object_type: function(obj: any) {
      if (root.jQuery && (root.jQuery.type != null)) {
        return root.jQuery.type(obj);
      }
      if (obj == null) {
        return "" + obj;
      }
      if (typeof obj === "object" || typeof obj === "function") {
        return this._classToType()[Object.prototype.toString.call(obj)] || "object";
      } else {
        return typeof obj;
      }
    },
    indexOf: function(array, element) {
      return this.indexOfImplementation(array, element);
    },

    indexOfImplementation: function(array, element) {
      var el, i, result, _i, _len;
      result = -1;
      for (i = _i = 0, _len = array.length; _i < _len; i = ++_i) {
        el = array[i];
        if (el === element) {
          result = i;
        }
      }
      return result;
    },
    namespace: function(object: Record<string, any>, namespace: string, routes: unknown) {
      var index, part, parts, _i, _len;
      parts = namespace ? namespace.split(".") : [];
      if (parts.length === 0) {
        return routes;
      }
      for (index = _i = 0, _len = parts.length; _i < _len; index = ++_i) {
        part = parts[index];
        if (index < parts.length - 1) {
          object = (object[part] || (object[part] = {}));
        } else {
          return object[part] = routes;
        }
      }
    },
    configure: function(new_config: Partial<Configuration>) {
      return (this as any).configuration = {...this.configuration, ...new_config};
    },
    config: function() {
      return {...this.configuration}
    },
    make: function() {
      var routes;
      routes = RubyVariables.ROUTES;
      routes.configure = function(config: Partial<Configuration>) {
        return Utils.configure(config);
      };
      routes.config = function() {
        return Utils.config();
      };
      routes.default_serializer = function(object: object, prefix: string = "") {
        return Utils.default_serializer(object, prefix);
      };
      Utils.namespace(root, RubyVariables.NAMESPACE, routes);
      return Object.assign({
        "default": routes
      }, routes);
    }
  } as const;

  const result = Utils.make();

  if (typeof define === "function" && define.amd) {
    define([], function() {
      return result;
    });
  }

  return result;

}).call(this);
