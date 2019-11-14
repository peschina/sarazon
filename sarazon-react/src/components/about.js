import React from "react";
import { Card } from "primereact/card";

const About = () => {
	const text = 'Sarazon is an e-commerce application built with React, Node.js, Express and MongoDB.'
	return (
		<div className='p-grid p-justify-center'>
		  <Card className='p-col-12 p-md-10 p-lg-8' style={{textAlign: 'center', boxShadow: 'unset'}}>
			<div className='p-col-12'>
			  <span>{text}</span>
			</div>	
		  </Card>
		</div>	
	);
}

export default About;


