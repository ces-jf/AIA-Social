package com.data.tcc.tcc.dto;

import java.io.Serializable;

public class ResultDTO implements Serializable {
	private static final long serialVersionUID = 1L;
	
	private double pcSim;
	private double pcNao;
	
	public ResultDTO() {}

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
