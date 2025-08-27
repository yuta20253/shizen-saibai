module Diag
  module Ai
    module WeedPrompt
      module_function

      # プロンプト文字列の生成
      def build_prompt(weeds_text_for_prompt)
        <<~TEXT
          受け取った画像に対して、
          その画像に写っている雑草の名前を教えてください。
          なお、雑草は「雑草一覧」から選択してください。

          ## 雑草一覧（以下から1つ選んでください）
          #{weeds_text_for_prompt}

          【重要】
          - 出力する雑草名は、必ず「雑草一覧」にある **1種類** のみ。
          - 一覧にない雑草名・学名・別名・形容詞などは **絶対に使用しないでください**。
          - 「雑草一覧」に含まれない名前を出力した場合はエラーとみなします。

          【禁止事項】
          - 上記一覧にない雑草名を出力すること
          - 複数の雑草名を出力すること
          - 別名・学名・英語名・画像の説明・その他のコメントを出力すること

          ## 出力JSONフォーマット(厳守)
          以下の形式でJSONのみ出力してください（前後に、```jsonなどの余計な説明は不要です）:

          {
            "weed_name": "ユウゲショウ"
          }
        TEXT
      end

      # OpenAI response_format の JSON スキーマ
      def response_schema(weeds_enum)
        {
          type: "json_schema",
          json_schema: {
            name: "weed_identification",
            strict: true,
            schema: {
              type: "object",
              properties: {
                weed_name: { type: "string", enum: weeds_enum },
              },
              required: ["weed_name"],
              additionalProperties: false,
            },
          },
        }
      end
    end
  end
end
