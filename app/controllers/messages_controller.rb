class MessagesController < ApplicationController

    def create
        @message = Message.new(message_params)
        @chatroom = Chatroom.find(params[:chatroom_id])
        @message.chatroom = @chatroom
        @message.user = current_user
        if @message.save
            ChatroomChannel.broadcast_to(
                @chatroom,
                render_to_string(partial: "message", locals: { message: @message })
              )
            redirect_to chatroom_path(@chatroom, anchor: "#{@chatroom.name}-submit")
        else
            flash[:alert] = @message.errors.full_messages
            render "chatrooms/show"
        end
    end


    private

    def message_params
        params.require(:message).permit(:content)
    end
end
