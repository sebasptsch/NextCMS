import { component, fields, NotEditable } from "@keystone-next/fields-document/component-blocks"
import React from "react"
import Gist from "react-gist"

export const gist = component({
    component: ({ id }) => {
        return <NotEditable><Gist id={id.value} /></NotEditable>
    },
    label: "Gist",
    props: {
        id: fields.text({ label: "Id", defaultValue: "" }),
        file: fields.text({ label: "File", defaultValue: "" })
    }
})
