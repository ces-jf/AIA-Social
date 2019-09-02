package com.data.tcc.tcc.resources;

import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.data.tcc.tcc.domain.Result;
import com.data.tcc.tcc.dto.ResultDTO;
import com.data.tcc.tcc.service.ResultService;

@RestController
@RequestMapping(value = "analises")
public class Analise {
	
	@Autowired
	private ResultService service;
	
	ModelMapper mapper = new ModelMapper();

	@GetMapping
	public ResponseEntity<ResultDTO> analisar() throws Exception {		
		
		Result res = service.EstimaDados();
		ResultDTO dto = mapper.map(res, ResultDTO.class);
		
		return ResponseEntity.ok().body(dto);
		
	}
}
