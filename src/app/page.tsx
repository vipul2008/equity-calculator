export default function Home() {
	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4">
			<div className="flex flex-col items-center p-8 min-w-md">
				{/* form heading */}
				<h1 className="font-bold text-2xl mb-4 text-center">
					Equity Calculator
				</h1>
				{/* First row - radio buttons */}
				<div className="flex p-2 mb-4 items-center gap-4 flex-wrap">
					<label className="flex items-center gap-1">
						<input type="radio" name="type" value="price" />
						<span>Buy Price</span>
					</label>
					<label className="flex items-center gap-1">
						<input type="radio" name="type" value="unit" />
						<span>Units</span>
					</label>
					<label className="flex items-center gap-1">
						<input type="radio" name="type" value="investment" />
						<span>Investment</span>
					</label>
				</div>
				{/* Second row - inputs */}
				<div className="flex justify-center gap-2 flex-wrap w-full">
					<div className="flex flex-col p-6 space-y-2 bg-white shadow-md rounded-lg flex-grow border border-green-500">
						<label
							htmlFor="price1"
							className="text-sm font-semibold text-gray-600"
						>
							Buy Price
						</label>
						<input
							type="number"
							id="price1"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						/>

						<label
							htmlFor="units1"
							className="text-sm font-semibold text-gray-600"
						>
							Units
						</label>
						<input
							type="number"
							id="units1"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						/>

						<label
							htmlFor="investment1"
							className="text-sm font-semibold text-gray-600"
						>
							Investment
						</label>
						<input
							type="number"
							id="investment1"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
						/>
					</div>
					<div className="flex flex-col p-6 space-y-2 bg-white shadow-md rounded-lg flex-grow border border-yellow-400">
						<label
							htmlFor="price2"
							className="text-sm font-semibold text-gray-600"
						>
							Buy Price
						</label>
						<input
							type="number"
							id="price2"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
						/>

						<label
							htmlFor="units2"
							className="text-sm font-semibold text-gray-600"
						>
							Units
						</label>
						<input
							type="number"
							id="units2"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
						/>

						<label
							htmlFor="investment2"
							className="text-sm font-semibold text-gray-600"
						>
							Investment
						</label>
						<input
							type="number"
							id="investment2"
							className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-500"
						/>
					</div>
				</div>
				{/* Third row - output labels */}
				<div className="flex flex-col items-start justify-items-start w-full my-4">
					<span>Average Buy Price :</span>
					<span>Total Units :</span>
					<span>Total Investment :</span>
				</div>
				{/* Fourth Row - Action buttons */}
				<div className="flex items-center gap-4 m-2 w-full justify-evenly">
					<button
						type="submit"
						className="flex-grow basis-1/2 p-2 bg-green-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
					>
						Calculate
					</button>
					<button
						type="submit"
						className="flex-grow basis-1/2 p-2 bg-blue-700 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700 focus:ring-opacity-50"
					>
						Clear
					</button>
				</div>
			</div>
		</main>
	);
}
