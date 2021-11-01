import { component, fields, NotEditable } from "@keystone-next/fields-document/component-blocks";
import React from "react";
import { Tweet } from "react-static-tweets";

export const tweet = component({
    component: ({ id }) => <NotEditable><Tweet id={id.value} /></NotEditable>,
    label: "Tweet",
    props: {
        id: fields.text({ label: "Id", defaultValue: "" })
    }
})