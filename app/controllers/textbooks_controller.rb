class TextbooksController < ApplicationController
    def index
        @textbooks = Textbook.all
        levels_order = ["英検5級", "英検4級", "英検3級", "英検準2級", "英検2級", "英検準1級"]
        @textbooks_by_level = @textbooks.group_by(&:level)
        # 並び替えたい場合は以下を追加
        @textbooks_by_level = @textbooks_by_level.sort_by { |level, _| levels_order.index(level) || 999 }.to_h
    end

    def show
        @textbook = Textbook.find(params[:id])
        @chapters = @textbook.chapters.includes(:audios)
    end
end

