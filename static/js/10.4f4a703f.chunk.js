(this["webpackJsonpthreejs-editor-react"]=this["webpackJsonpthreejs-editor-react"]||[]).push([[10],{96:function(e,t,a){"use strict";a.r(t),a.d(t,"GeometryParametersPanel",(function(){return o}));var r=a(0),n=a(1),d=a(58);function o(e,t){var a=e.strings,o=e.signals,s=new n.l,i=t.geometry.parameters,c=new n.l,g=new n.j(i.radius).onChange(p);c.add(new n.p(a.getKey("sidebar/geometry/octahedron_geometry/radius")).setWidth("90px")),c.add(g),s.add(c);var h=new n.l,u=new n.i(i.detail).setRange(0,1/0).onChange(p);function p(){e.execute(new d.a(e,t,new r.OctahedronGeometry(g.getValue(),u.getValue()))),o.objectChanged.dispatch(t)}return h.add(new n.p(a.getKey("sidebar/geometry/octahedron_geometry/detail")).setWidth("90px")),h.add(u),s.add(h),s}}}]);
//# sourceMappingURL=10.4f4a703f.chunk.js.map