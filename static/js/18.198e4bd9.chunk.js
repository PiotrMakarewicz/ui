(this["webpackJsonpthreejs-editor-react"]=this["webpackJsonpthreejs-editor-react"]||[]).push([[18],{104:function(e,t,a){"use strict";a.r(t),a.d(t,"GeometryParametersPanel",(function(){return o}));var n=a(0),r=a(1),d=a(22),s=a(58);function o(e,t){var a=e.strings,o=new r.l,g=t.geometry.parameters,l=new r.l;l.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/path")).setWidth("90px"));var u=(new d.d).setValue(g.path.points).onChange(K);l.add(u),o.add(l);var i=new r.l,m=new r.j(g.radius).onChange(K);i.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/radius")).setWidth("90px")),i.add(m),o.add(i);var p=new r.l,y=new r.i(g.tubularSegments).onChange(K);p.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/tubularsegments")).setWidth("90px")),p.add(y),o.add(p);var w=new r.l,h=new r.i(g.radialSegments).onChange(K);w.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/radialsegments")).setWidth("90px")),w.add(h),o.add(w);var c=new r.l,b=new r.c(g.closed).onChange(K);c.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/closed")).setWidth("90px")),c.add(b),o.add(c);var v=new r.l,V=(new r.m).setOptions({centripetal:"centripetal",chordal:"chordal",catmullrom:"catmullrom"}).setValue(g.path.curveType).onChange(K);v.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/curvetype")).setWidth("90px"),V),o.add(v);var C=(new r.l).setDisplay("catmullrom"==V.getValue()?"":"none"),x=new r.j(g.path.tension).setStep(.01).onChange(K);function K(){C.setDisplay("catmullrom"==V.getValue()?"":"none"),e.execute(new s.a(e,t,new n.TubeGeometry(new n.CatmullRomCurve3(u.getValue(),b.getValue(),V.getValue(),x.getValue()),y.getValue(),m.getValue(),h.getValue(),b.getValue())))}return C.add(new r.p(a.getKey("sidebar/geometry/tube_geometry/tension")).setWidth("90px"),x),o.add(C),o}}}]);
//# sourceMappingURL=18.198e4bd9.chunk.js.map