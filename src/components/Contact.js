import React from "react"
import Page from "./Page"
export default () => {
  return (
    <Page id="contact">
      <div
        style={{ width: "100%" }}
        dangerouslySetInnerHTML={{
          __html: `<script src="https://static.airtable.com/js/embed/embed_snippet_v1.js"></script><iframe class="airtable-embed airtable-dynamic-height" src="https://airtable.com/embed/shrbsxDTGlBIeBC3S?backgroundColor=yellow" frameborder="0" onmousewheel="" width="100%" height="900px" style="background: transparent; border: 0"></iframe>`
        }}
      ></div>
    </Page>
  )
}
