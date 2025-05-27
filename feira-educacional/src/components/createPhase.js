import { useState } from "react";
import "./createPhase.css";

function CreatePhase({id, criteria, updatePhaseCriteria, addPhaseCriteria, removePhaseCriteria, handlePhaseFileSubmissionChange}) {
  return (
    <div className="row">
      <div className="col-12 mb-2">
        <label className="label fs-5">{`Fase ${id+1}`}</label>
      </div>

      <div className="col-12 col-md-6 mb-2">
        <label className="label">Submissão</label>
        <button className="btn squareBtn p-1 w-100">
          <i className="bi bi-calendar-range me-2 flex-shrink-0"></i>
          Adicionar data
        </button>
      </div>
      <div className="col-12 col-md-6 mb-2">
        <label className="label">Avaliação</label>
        <button className="btn squareBtn p-1 w-100">
          <i className="bi bi-calendar-range me-2 flex-shrink-0"></i>
          Adicionar data
        </button>
      </div>

      <div className="col-12 mb-2">
        <div className="form-check">
          <input className="form-check-input" type="checkbox" id="fileSubmit" onChange={() => handlePhaseFileSubmissionChange(id)}/>
          <label className="form-check-label" htmlFor="fileSubmit">
            Submissão de arquivo
          </label>
        </div>
      </div>
      <div className="col-12 mb-2">
        <label className="label">Critérios de avaliação</label>
        {criteria.map((item, i) => (
          <div key={i} className="d-flex mb-2">
            <div className="w-100 d-flex flex-column flex-sm-row gap-2">
              <input
                type="text"
                className="form-control"
                placeholder={`Critério ${i + 1}`}
                value={criteria[i].value}
                onChange={(e) => updatePhaseCriteria(id, i, e.target.value)}
                maxLength="80"
              />
              <button
                className="btn-remove"
                onClick={() => removePhaseCriteria(id, i)}
                disabled={criteria.length <= 1}
                type="button"
              >
                Remover
              </button>
            </div>
          </div>
        ))}
        <button
          className="squareBtn p-1 w-100 fs-6 mb-3"
          onClick={(e) => {
            e.preventDefault();
            addPhaseCriteria(id);
          }}
          disabled={criteria.length >= 11}
        >
          <i className="bi bi-plus me-2 flex-shrink-0"></i>
          Adicionar critério
        </button>
      </div>
    </div>
  );
}

export default CreatePhase;
