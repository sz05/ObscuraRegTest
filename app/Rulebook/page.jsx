const Rulebook = () => {
  return (
    <div className="flex flex-col items-center w-full h-[80vh] relative">
      <h1 className="text-5xl mb-3">RULEBOOK</h1>
      <div className="relative">
        <img src="/assets/scroll2.png" alt="Scroll" className="h-[75vh]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[65%] h-[55vh] p-4 overflow-y-auto bg-transparent text-black z-10">
          <h1 className="text-2xl text-left mb-3">
            ○ The game consists of three levels.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ In level 1, every correct answer makes the team earn +100 points,
            and usage of hint will result in loss of -30 points.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ In level 2, every correct answer will earn the team +200 and usage
            of hint will cost them -60 points.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ In the last level, each correct answer will add 300 points to the
            team's score, while using a hint will deduct 90 points.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Each team can consist of 1-4 players.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ All teams must join the official Discord server for Syrinx for all
            updates.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Ensure that your Discord username matches the one filled in the
            registration form for identification purposes.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Ensure to use only a Laptop/PC for the event.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Participants must log in 10 minutes before the start of the game.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Note that the answer format is case-sensitive.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ Hints will be provided to ease question difficulties.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ A leaderboard will display the progress of the teams for each
            level.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ In case of a tie between teams due to the same scores, the team
            that took less time to solve the questions will proceed.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ If the question starts starts with Error with a capital "E" then
            it is an error please report it to an admin!
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ If caught cheating we hold the abiity to disqualify/deduct points
            from the team.
          </h1>
          <h1 className="text-2xl text-left mb-3">
            ○ The decision of the admin will be final and binding.
          </h1>
        </div>
      </div>
    </div>
  );
};

export default Rulebook;
