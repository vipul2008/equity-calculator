"use client";
import React, { useReducer } from "react";

const initialState = {
	selectedOption: "investment",
	disableUnits: false,
	disablePrice: false,
	disableInvestment: true,
	units1: 0,
	price1: 0,
	investment1: 0,
	units2: 0,
	price2: 0,
	investment2: 0,
	averagePrice: 0,
	totalUnits: 0,
	totalInvestment: 0,
};

type State = {
	selectedOption: string;
	disableUnits: boolean;
	disablePrice: boolean;
	disableInvestment: boolean;
	units1: number;
	price1: number;
	investment1: number;
	units2: number;
	price2: number;
	investment2: number;
	averagePrice: number;
	totalUnits: number;
	totalInvestment: number;
	[key: string]: any;
};

enum ActionType {
	Units = "units",
	Price = "price",
	Investment = "investment",
	UnitsChange = "units.change",
	PriceChange = "price.change",
	InvestmentChange = "investment.change",
	Reset = "reset",
	Calculate = "calculate",
}

const calculatePUI = (
	state: State,
	index: number,
	units: number,
	price: number,
	investment: number
) => {
	if (state.disableUnits) {
		return {
			["units" + index]: price ? investment / price : 0,
		};
	} else if (state.disablePrice) {
		return {
			["price" + index]: units ? investment / units : 0,
		};
	} else if (state.disableInvestment) {
		return {
			["investment" + index]: units && price ? units * price : 0,
		};
	}
};

const calculateTotal = (state: State) => {
	const totalInvestment = state.investment1 + state.investment2;
	const totalUnits = state.units1 + state.units2;
	const averagePrice = totalInvestment / totalUnits;
	return {
		averagePrice: isNaN(averagePrice) ? 0 : averagePrice,
		totalUnits,
		totalInvestment,
	};
};

const reducer = (
	state: State,
	action: { type: ActionType; value: any; index: number }
) => {
	switch (action.type) {
		case ActionType.Units:
			return {
				...state,
				selectedOption: action.type,
				disableUnits: true,
				disablePrice: false,
				disableInvestment: false,
			};
		case ActionType.Price:
			return {
				...state,
				selectedOption: action.type,
				disableUnits: false,
				disablePrice: true,
				disableInvestment: false,
			};
		case ActionType.Investment:
			return {
				...state,
				selectedOption: action.type,
				disableUnits: false,
				disablePrice: false,
				disableInvestment: true,
			};
		case ActionType.UnitsChange:
			return {
				...state,
				["units" + action.index]: action.value,
				...calculatePUI(
					state,
					action.index,
					action.value,
					state["price" + action.index],
					state["investment" + action.index]
				),
			};
		case ActionType.PriceChange:
			return {
				...state,
				["price" + action.index]: action.value,
				...calculatePUI(
					state,
					action.index,
					state["units" + action.index],
					action.value,
					state["investment" + action.index]
				),
			};
		case ActionType.InvestmentChange:
			return {
				...state,
				["investment" + action.index]: action.value,
				...calculatePUI(
					state,
					action.index,
					state["units" + action.index],
					state["price" + action.index],
					action.value
				),
			};
		case ActionType.Reset:
			return initialState;
		case ActionType.Calculate:
			return {
				...state,
				...calculateTotal(state),
			};
	}
};

export default function Home() {
	const handleOptionChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		dispatch({
			type: event.target.value as ActionType,
			value: 0,
			index: 0,
		});
	};

	const [state, dispatch] = useReducer(reducer, initialState);

	return (
		<main className="flex min-h-screen flex-col items-center justify-between p-4">
			<div className="flex flex-col items-center p-8 min-w-md text-green-700">
				{/* form heading */}
				<h1 className="font-bold text-2xl mb-4 text-center bg-gradient-to-r from-green-700 via-green-600 to-yellow-500 text-transparent bg-clip-text">
					Equity Average Calculator
				</h1>
				{/* First row - radio buttons */}
				<div className="flex p-2 mb-4 items-center gap-4 flex-wrap">
					<label className="flex items-center gap-1">
						<input
							type="radio"
							name="bytype"
							value="price"
							checked={state.selectedOption === "price"}
							onChange={handleOptionChange}
						/>
						<span>Buy Price</span>
					</label>
					<label className="flex items-center gap-1">
						<input
							type="radio"
							name="bytype"
							value="units"
							checked={state.selectedOption === "units"}
							onChange={handleOptionChange}
						/>
						<span>Units</span>
					</label>
					<label className="flex items-center gap-1">
						<input
							type="radio"
							name="bytype"
							value="investment"
							checked={state.selectedOption === "investment"}
							onChange={handleOptionChange}
						/>
						<span>Investment</span>
					</label>
				</div>
				{/* Second row - inputs */}
				<div className="flex justify-center gap-2 flex-wrap w-full">
					<div className="flex flex-col p-6 space-y-2 bg-white shadow-md rounded-lg flex-grow border border-green-600">
						<label
							htmlFor="price1"
							className="text-sm font-semibold"
						>
							Buy Price
						</label>
						<input
							type="number"
							id="price1"
							className="p-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 disabled:bg-gray-200"
							disabled={state.disablePrice}
							value={state.price1}
							onChange={(e) =>
								dispatch({
									type: ActionType.PriceChange,
									value: Number(e.target.value),
									index: 1,
								})
							}
						/>

						<label
							htmlFor="units1"
							className="text-sm font-semibold"
						>
							Units
						</label>
						<input
							type="number"
							id="units1"
							className="p-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 disabled:bg-gray-200"
							disabled={state.disableUnits}
							value={state.units1}
							onChange={(e) =>
								dispatch({
									type: ActionType.UnitsChange,
									value: Number(e.target.value),
									index: 1,
								})
							}
						/>

						<label
							htmlFor="investment1"
							className="text-sm font-semibold"
						>
							Investment
						</label>
						<input
							type="number"
							id="investment1"
							className="p-2 border border-green-600 rounded-md focus:outline-none focus:ring-1 focus:ring-green-600 disabled:bg-gray-200"
							disabled={state.disableInvestment}
							value={state.investment1}
							onChange={(e) =>
								dispatch({
									type: ActionType.InvestmentChange,
									value: Number(e.target.value),
									index: 1,
								})
							}
						/>
					</div>
					<div className="flex flex-col p-6 space-y-2 bg-white shadow-md rounded-lg flex-grow border border-yellow-600 text-yellow-600">
						<label
							htmlFor="price2"
							className="text-sm font-semibold text-yellow-600"
						>
							Buy Price
						</label>
						<input
							type="number"
							id="price2"
							className="p-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 disabled:bg-gray-200"
							disabled={state.disablePrice}
							value={state.price2}
							onChange={(e) =>
								dispatch({
									type: ActionType.PriceChange,
									value: Number(e.target.value),
									index: 2,
								})
							}
						/>

						<label
							htmlFor="units2"
							className="text-sm font-semibold text-yellow-600"
						>
							Units
						</label>
						<input
							type="number"
							id="units2"
							className="p-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 disabled:bg-gray-200"
							disabled={state.disableUnits}
							value={state.units2}
							onChange={(e) =>
								dispatch({
									type: ActionType.UnitsChange,
									value: Number(e.target.value),
									index: 2,
								})
							}
						/>

						<label
							htmlFor="investment2"
							className="text-sm font-semibold text-yellow-600"
						>
							Investment
						</label>
						<input
							type="number"
							id="investment2"
							className="p-2 border border-yellow-600 rounded-md focus:outline-none focus:ring-1 focus:ring-yellow-600 disabled:bg-gray-200"
							disabled={state.disableInvestment}
							value={state.investment2}
							onChange={(e) =>
								dispatch({
									type: ActionType.InvestmentChange,
									value: Number(e.target.value),
									index: 2,
								})
							}
						/>
					</div>
				</div>
				{/* Third row - output labels */}
				<div className="flex flex-col w-full my-4">
					<span className="font-bold self-center">
						Average Buy Price: {state.averagePrice.toFixed(2)}
					</span>
					<div className="flex justify-between flex-wrapp-4">
						<span className="font-bold mr-auto">
							Total Units: {state.totalUnits.toFixed(2)}
						</span>
						<span className="font-bold">
							Total Investment: {state.totalInvestment.toFixed(2)}
						</span>
					</div>
				</div>
				{/* Fourth Row - Action buttons */}
				<div className="flex items-center gap-4 m-2 w-full justify-evenly">
					<button
						className="flex-grow basis-1/2 p-2 bg-green-700 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50"
						onClick={(e) =>
							dispatch({
								type: ActionType.Calculate,
								value: 0,
								index: 0,
							})
						}
					>
						Calculate
					</button>
					<button
						className="flex-grow basis-1/2 p-2 bg-yellow-700 text-white rounded-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-700 focus:ring-opacity-50"
						onClick={() =>
							dispatch({
								type: ActionType.Reset,
								value: 0,
								index: 0,
							})
						}
					>
						Clear
					</button>
				</div>
			</div>
		</main>
	);
}
