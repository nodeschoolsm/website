import React from "react"
import Layout from "../../components/layout"

export default () => {
  return (
    <Layout>
      <div className="min-h-screen"></div>
      <div className="p-8 lg:p-16">
        <div
          dangerouslySetInnerHTML={{
            __html: `<iframe class="airtable-embed" src="https://airtable.com/embed/shrx0tlbNehuJQFyF?backgroundColor=white" frameborder="0" onmousewheel="" width="100%" height="533" style="background: transparent; border: none; border-radius: 4px"></iframe>`,
          }}
        />
      </div>
    </Layout>
  )
}
