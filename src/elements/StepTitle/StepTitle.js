import React from 'react';
// import { , } from 'antd';
import './StepTitle.css'

export default (props) => {
	return (
		<div className="step_title_cntr">
			<div className="step_title_number">{props.stepNumber}</div>
			<div className="step_title_caption">step</div>
		</div>
		// <div class="div-block-129-c7opy-copy stp">
		// 	<div class="_1t">1<br></div>
		// 		<div>step</div>
		// 	</div>
	)
}