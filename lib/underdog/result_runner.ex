defmodule Underdog.ResultRunner do
  use GenServer
  require Logger

  def start_link do
    GenServer.start_link(__MODULE__, %{})
  end

  def init(state) do
    schedule_work() # Schedule work to be performed at some point
    {:ok, state}
  end

  def handle_info(:work, state) do
    # Do the work you desire here
    schedule_work() # Reschedule once more
    Logger.warn "Result runner handle info"
    {:noreply, state}
  end

  defp schedule_work() do
    Process.send_after(self(), :work, 1 * 1000) # In 1 second
  end
end
