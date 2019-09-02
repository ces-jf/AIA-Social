package com.data.tcc.tcc.service;

import org.springframework.stereotype.Service;

import com.data.tcc.tcc.domain.Result;

import weka.classifiers.bayes.NaiveBayes;
import weka.core.DenseInstance;
import weka.core.Instance;
import weka.core.Instances;
import weka.core.converters.ConverterUtils.DataSource;

@Service
public class ResultService {

	public Result EstimaDados() throws Exception {
		DataSource ds = new DataSource("C:\\Projetos\\AIA-Social\\src\\main\\java\\com\\data\\tcc\\tcc\\resources\\mercado.arff");
		Instances ins = ds.getDataSet();
		
		// Qual atríbuto eu realmtente quero fazer a previsão
		ins.setClassIndex(1);
		
		// Qual algoritmo eu vou utilizar
		NaiveBayes nb = new NaiveBayes();
		nb.buildClassifier(ins);

		Instance novo = new DenseInstance(7);
		novo.setDataset(ins);
		novo.setValue(0, "nao");
		novo.setValue(2, "nao");
		novo.setValue(3, "sim");
		novo.setValue(4, "sim");
		novo.setValue(5, "nao");
		novo.setValue(6, "nao");
		
		double probalididade[] = nb.distributionForInstance(novo);
		
		Result res = new Result(probalididade[0], probalididade[1]);
		return res;
	}
	
}
