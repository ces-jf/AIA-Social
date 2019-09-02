package com.data.tcc.tcc.domain;

public class Result {

	private double pcSim;
	private double pcNao;
	
	public Result(double pcSim, double pcNao) {
		super();
		this.pcSim = pcSim;
		this.pcNao = pcNao;
	}
	
	public double getPcSim() {
		return pcSim;
	}
	public void setPcSim(double pcSim) {
		this.pcSim = pcSim;
	}
	public double getPcNao() {
		return pcNao;
	}
	public void setPcNao(double pcNao) {
		this.pcNao = pcNao;
	}
	
	
}
