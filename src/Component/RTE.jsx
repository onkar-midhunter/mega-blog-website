import React from "react";
import { Editor } from "@tinymce/tinymce-react";
import "tinymce/tinymce";
import "tinymce/icons/default";
import "tinymce/themes/silver";
import "tinymce/models/dom";

// Import plugins you want
import "tinymce/plugins/advlist";
import "tinymce/plugins/autolink";
import "tinymce/plugins/lists";
import "tinymce/plugins/link";
import "tinymce/plugins/image";
import "tinymce/plugins/charmap";
import "tinymce/plugins/preview";
import "tinymce/plugins/code";
import "tinymce/plugins/table";
import "tinymce/plugins/media";
import "tinymce/plugins/fullscreen";
import "tinymce/plugins/wordcount";
import "tinymce/plugins/visualblocks";
import "tinymce/plugins/emoticons";
import "tinymce/plugins/searchreplace";
import "tinymce/plugins/codesample";
import "tinymce/plugins/help";
import "tinymce/plugins/quickbars";
import "tinymce/skins/ui/oxide/skin.min.css";
import "tinymce/skins/content/default/content.min.css";
import "tinymce/skins/content/default/content.css";
import { Controller } from "react-hook-form";

function RTE({ name, control, label, defaultValue = "" }) {
  return (
    <div className="w-full">
      {label && <label className="inline-block mb-1 pl-1">{label}</label>}
      <Controller
        name={name || "content"}
        control={control}
        render={({ field: { onChange } }) => (
          <Editor
            apiKey="frkpxciqnon43phcjln0vyi17zj2anmdh6r7kddiom8crnyx"
            init={{
              plugins:
                "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount fullscreen media help quickbars code",
              toolbar:
                "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap codesample | visualblocks wordcount fullscreen searchreplace help code | removeformat",
              menubar: "file edit view insert format tools table help",
              quickbars_selection_toolbar:
                "bold italic | quicklink h2 h3 blockquote quickimage quicktable",
              toolbar_mode: "sliding",
            }}
            initialValue={defaultValue}
          />
        )}
      />
    </div>
  );
}

export default RTE;
