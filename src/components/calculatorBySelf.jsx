import React, { useState } from 'react';
import './calculatorBySelf.css';
import { evaluate } from 'mathjs';
function Calculator() {
	const [input, setInput] = useState('');
	const [output, setOutput] = useState('');
	const buttonPressed = (pressedButton) => {
		if (pressedButton === 'AC') {
			setInput(''); // Clear the input
			setOutput('');
		} else if (typeof pressedButton == 'object') {
			const popLastValue = input.split('');
			popLastValue.pop();
			setInput(popLastValue.join(''));
		} else if (pressedButton === '=') {
			if (input) {
				try {
					const result = evaluate(input); // Assuming 'evaluate' is a valid function
					setOutput(' = ' + result.toString()); // Set result as the new input
				} catch (error) {
					setOutput('Error'); // Handle invalid expressions
				}
			} else {
				setOutput('no value to evaluate..');
			}
		} else {
			// Handle other button presses (e.g., numbers, operators)
			setInput(input.concat(pressedButton));
		}
	};
	const calculatorValues = [
		['AC', '+/-', '%', '/'],
		[7, 8, 9, '*'],
		[4, 5, 6, '-'],
		[1, 2, 3, '+'],
		[0, '.', '=', <i className="bi bi-x-circle"></i>],
	];
	const renderClassName = (items) => {
		if (items === '.') return 'btn-warning dot';
		if (typeof items === 'object') return 'btn-danger notDot';
		return typeof items === 'number'
			? 'btn-primary notDot'
			: 'btn-warning notDot';
	};
	return (
		<div style={{ marginLeft: '10vw' }}>
			<div className="superiorDiv">
				<div className="superDiv">
					<h1 className="display">{input}</h1>
					<h3 className="outPut"> {output}</h3>
					<h1 className="outerBox">
						{calculatorValues.map((calculatorValues, index) => (
							<div
								className="d-flex justify-content-between outerCalc mt-4"
								key={index}
							>
								{calculatorValues.map((calculatorValues2, indexOFCalc) => (
									<button
										onClick={() => buttonPressed(calculatorValues2)}
										className={`btn ${renderClassName(
											calculatorValues2
										)} extra `}
										key={indexOFCalc}
									>
										{calculatorValues2}
									</button>
								))}
							</div>
						))}
					</h1>
				</div>{' '}
			</div>
		</div>
	);
}
export default Calculator;
