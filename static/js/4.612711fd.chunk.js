(this["webpackJsonpthreejs-editor-react"]=this["webpackJsonpthreejs-editor-react"]||[]).push([[4],{90:function(e,t,a){"use strict";a.r(t),a.d(t,"GeometryParametersPanel",(function(){return s}));var r=a(0),n=a(1),d=a(58);function s(e,t){var a=e.strings,s=new n.l,i=t.geometry.parameters,g=new n.l,h=new n.j(i.radius).onChange(u);g.add(new n.p(a.getKey("sidebar/geometry/circle_geometry/radius")).setWidth("90px")),g.add(h),s.add(g);var o=new n.l,l=new n.i(i.segments).setRange(3,1/0).onChange(u);o.add(new n.p(a.getKey("sidebar/geometry/circle_geometry/segments")).setWidth("90px")),o.add(l),s.add(o);var c=new n.l,w=new n.j(i.thetaStart*r.MathUtils.RAD2DEG).setStep(10).onChange(u);c.add(new n.p(a.getKey("sidebar/geometry/circle_geometry/thetastart")).setWidth("90px")),c.add(w),s.add(c);var p=new n.l,m=new n.j(i.thetaLength*r.MathUtils.RAD2DEG).setStep(10).onChange(u);function u(){e.execute(new d.a(e,t,new r.CircleGeometry(h.getValue(),l.getValue(),w.getValue()*r.MathUtils.DEG2RAD,m.getValue()*r.MathUtils.DEG2RAD)))}return p.add(new n.p(a.getKey("sidebar/geometry/circle_geometry/thetalength")).setWidth("90px")),p.add(m),s.add(p),s}}}]);
//# sourceMappingURL=4.612711fd.chunk.js.map