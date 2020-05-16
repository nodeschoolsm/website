import React from "react"
import Footer from "../../components/footer"
import Marquee from "../../components/marquee"
import Nav from "../../components/nav"
import Seo from "../../components/seo"
export default () => {
  return (
    <div className="w-full max-h-screen overflow-x-hidden overflow-y-auto bg-white">
      <Nav title="Eventos" />
      <div className="min-h-screen"></div>
      <div className="p-8 lg:p-16">
        <div
          dangerouslySetInnerHTML={{
            __html: `<iframe class="airtable-embed" src="https://airtable.com/embed/shrx0tlbNehuJQFyF?backgroundColor=white" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: none; border-radius: 4px"></iframe>`,
          }}
        ></div>
      </div>

      <Marquee>NODESCHOOL SAN MIGUEL,</Marquee>
      <Footer />
    </div>
  )
}
