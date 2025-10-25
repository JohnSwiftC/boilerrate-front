'use client'

export default function Blog() {
    return (
            <div className="flex flex-col items-center p-10">
      <div className="bg-white rounded-xl border border-gray-200 w-full sm:w-11/12 md:w-4/5 lg:w-3/4 xl:w-2/3 mx-auto p-6 sm:p-10 text-gray-900">
        <div className="text-4xl font-bold">
          Welcome to BoilerRate!
        </div>
        <sub>August 10th, 2025</sub>

        <div className='mt-5'>
          <p>
            Hi! I'm John, and I'm building the BEST platform for Purdue students to elevate their professional presence.
          </p>
          <br></br>
          <p>
            Just kidding. It's hot or not for Purdue LinkedIn accounts. A month long competition where the top three best voted LinkedIn accounts get MONEY and other
            assorted items I can come up with by the end!
          </p>
          <br></br>
          <p>
            Every hour during the competition, you will have the opportunity to view two random users and their LinkedIn accounts, and then vote on the better profile.
            The winner of your choice gains points, and the loser loses points. The top three accounts by the end of the month get STUFF and MONEY!!!
          </p>
          <br></br>
          <p>
            Register and connect your LinkedIn NOW! The competition will start in a month or so, whenever I get everything settled and enough players.
          </p>
        </div>
      </div>
    </div>
    )
}