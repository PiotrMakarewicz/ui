(this["webpackJsonpthreejs-editor-react"]=this["webpackJsonpthreejs-editor-react"]||[]).push([[5],{91:function(e,t,d){"use strict";d.r(t),d.d(t,"GeometryParametersPanel",(function(){return g}));var n=d(0),a=d(1),r=d(58);function g(e,t){var d=e.strings,g=new a.l,i=t.geometry.parameters,o=new a.l,s=new a.j(i.radiusTop).onChange(x);o.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/radiustop")).setWidth("90px")),o.add(s),g.add(o);var y=new a.l,h=new a.j(i.radiusBottom).onChange(x);y.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/radiusbottom")).setWidth("90px")),y.add(h),g.add(y);var l=new a.l,m=new a.j(i.height).onChange(x);l.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/height")).setWidth("90px")),l.add(m),g.add(l);var w=new a.l,p=new a.i(i.radialSegments).setRange(1,1/0).onChange(x);w.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/radialsegments")).setWidth("90px")),w.add(p),g.add(w);var u=new a.l,c=new a.i(i.heightSegments).setRange(1,1/0).onChange(x);u.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/heightsegments")).setWidth("90px")),u.add(c),g.add(u);var b=new a.l,v=new a.c(i.openEnded).onChange(x);function x(){e.execute(new r.a(e,t,new n.CylinderGeometry(s.getValue(),h.getValue(),m.getValue(),p.getValue(),c.getValue(),v.getValue())))}return b.add(new a.p(d.getKey("sidebar/geometry/cylinder_geometry/openended")).setWidth("90px")),b.add(v),g.add(b),g}}}]);
//# sourceMappingURL=5.c42fc6f6.chunk.js.map