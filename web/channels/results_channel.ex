defmodule Underdog.ResultsChannel do
  require Logger
  use Phoenix.Channel
  import Guardian.Phoenix.Socket

  def join( "results", _params, socket ) do
    {:ok, socket}
  end

  def handle_in( "new_results", %{ "payload" => payload }, socket ) do
    broadcast! socket, payload, "new_results", %{ payload: payload }
    {:noreply, socket}
  end
  
  # def handle_out( "new_results", payload, socket ) do
  #   push socket, "new_results", payload
  #   {:noreply, socket}
  # end

end
