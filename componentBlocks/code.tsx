import {
  component, fields, FormField, NotEditable
} from "@keystone-next/fields-document/component-blocks";
import { FieldContainer, FieldLabel, TextArea } from "@keystone-ui/fields";
import React from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import atomOneDark from "react-syntax-highlighter/dist/cjs/styles/hljs/atom-one-dark";

const textarea = ({
  label,
  defaultValue = "",
}: {
  label: string;
  defaultValue?: string;
}): FormField<string, undefined> => {
  return {
    kind: "form",
    Input({ value, onChange, autoFocus }) {
      return (
        <FieldContainer>
          <FieldLabel>{label}</FieldLabel>
          <TextArea
            autoFocus={autoFocus}
            value={value}
            style={{ fontFamily: "monospace" }}
            onChange={(event) => {
              onChange(event.target.value);
            }}
          />
        </FieldContainer>
      );
    },
    options: undefined,
    defaultValue,
    validate(value) {
      return typeof value === "string";
    },
  };
}



export const code = component({
  component: ({ content, language }) => {
    return (
      <NotEditable>
        <SyntaxHighlighter language={language.value} style={atomOneDark}>
          {content.value}
        </SyntaxHighlighter>
      </NotEditable>
    );
  },
  label: "Code",
  props: {
    content: textarea({
      label: "Code",
      defaultValue: "console.log('Hello World!');",
    }),
    language: fields.text({ defaultValue: "javascript", label: "Language" }),
  },
  chromeless: false,
});

