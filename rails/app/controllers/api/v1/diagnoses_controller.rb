class Api::V1::DiagnosesController < Api::V1::BaseController
  require 'openai'
  def create
    file_type = ['image/jpeg', 'image/png']
    # max_size = 5.megabytes

    image = "https://www.google.com/search?sca_esv=87f102440c8210d8&sxsrf=AE3TifP6FJodp3pln1k3DnACt9XSfM6fXA:1754176147332&udm=2&fbs=AIIjpHzQki16q-8Z7j6aseYi2jA_awT46aeCpCIps-CmKmRFQnye5ZCZ-joo3KzReil4N40QrqWZdLtqYZcrC12sd5RRjC38EHLHO6A0CnHavpwLTiJ-ckXqcav9y-eXIg8IfNrI9XUpM3ALEobobagXOJglX0WFqzRZJrdgpmiIZOuVOPMHVXZPOINQcNjGQlOqPuh7rA56sWmDiUasxyzE8KAJSNi9j-46SgWI1P1oirZJjUMinc0poFVM2CYe5iWxXeTuYt6A&q=%E3%82%B9%E3%82%BA%E3%83%A1%E3%83%8E%E3%82%AB%E3%82%BF%E3%83%93%E3%83%A9&sa=X&ved=2ahUKEwipnYqxn-2OAxVEna8BHUBGEzUQtKgLegQIERAB&biw=1440&bih=812&dpr=2#vhid=UyneVnNBtatKlM&vssid=mosaic"

    # ファイル形式が不正
    # raise ActionController::ParameterMissing, :image if params[:image].blank?
    # unless file_type.include?(image.content_type)
    #   render json: {message: "ファイル形式が不正です", code: :invalid_file_type, status: "error"}
    #   return
    # end

    # ファイルサイズ超過
    # if image.size > max_size
    #   render json: { status: 'error', code: :file_size_exceeded, message: 'ファイルサイズが大きすぎます' }, status: :bad_request
    #   return
    # end

    data_json = Diagnosis::Json::JsonExportService.new.call
    vegetables_json = data_json[:vegetables_to_json]
    weeds_json = data_json[:weeds_to_json]
    soils_json = data_json[:soils_to_json]

    begin
      data = Diagnosis::Ai::PromptResponderService.new(vegetables_json: vegetables_json, weeds_json: weeds_json, soils_json: soils_json, image: image).call
    rescue => e
      Rails.logger.error("OpenAI呼び出しエラー: #{e.class} - #{e.message}")
      Rails.logger.error(e.backtrace.join("\n"))
      render json: { error: e.message }, status: 500 and return
    end

    vegetable_name = data["vegetable"]["name"]
    weed_name = data["weed"]["name"]
    soil_data = data["soil"]
    diagnosis_result = data["diagnosis"]["result"]
    weed_soil_relation = data["weed_soil_relation"]
    soil_vegetable_relation = data["soil_vegetable_relation"]

    Diagnosis::Db::SaveRecordService.new(vegetable_name: vegetable_name, weed_name: weed_name, soil_data: soil_data, weed_soil_relation: weed_soil_relation, soil_vegetable_relation: soil_vegetable_relation).call

    render json: { message: data }, status: :ok
  end
end
