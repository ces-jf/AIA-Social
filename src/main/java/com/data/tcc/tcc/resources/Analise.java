package com.data.tcc.tcc.resources;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

@RestController
@RequestMapping(value = "analises")
public class Analise {

	@GetMapping
	public void analisar() throws Exception {		
		
		DataSource ds = new DataSource("/resources/pedidos.arff");
		Instances ins = ds.getDataSet();
		
		String dados = ins.toString();		
		
	}
}
