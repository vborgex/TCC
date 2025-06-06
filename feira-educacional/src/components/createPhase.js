import "./createPhase.css";
import { useEffect, useState } from "react";

function CreatePhase({
  id,
  criteria,
  textAreas,
  setSubmission,
  numberApproved,
  isSubmitting,
  addPhaseTextAreas,
  removePhaseTextAreas,
  updatePhaseTextAreas,
  updatePhaseCriteria,
  addPhaseCriteria,
  removePhaseCriteria,
  handlePhaseFileSubmissionChange,
  handlePhaseNumberApprovedBlur,
}) {
  console.log(criteria);
  const [localNumberApproved, setLocalNumberApproved] = useState(
    numberApproved || ""
  );

  useEffect(() => {
    setLocalNumberApproved(numberApproved || "");
  }, [numberApproved]);

  const handleChange = (e) => {
    setLocalNumberApproved(e.target.value);
  };
  const handleBlur = (e) => {
    handlePhaseNumberApprovedBlur(id, e);
  };

  return (
    <div className="row">
      <div className="col-12 mb-2">
        <label className="label fs-5">{`Fase ${id + 1}`}</label>
      </div>

      <div className="col-12 col-md-6 mb-2">
        <label className="label">Submissão</label>
        <button className="btn squareBtn p-1 w-100" disabled = {isSubmitting}>
          <i className="bi bi-calendar-range me-2 flex-shrink-0"></i>
          Adicionar data
        </button>
      </div>
      <div className="col-12 col-md-6 mb-2">
        <label className="label">Avaliação</label>
        <button className="btn squareBtn p-1 w-100" disabled = {isSubmitting}>
          <i className="bi bi-calendar-range me-2 flex-shrink-0"></i>
          Adicionar data
        </button>
      </div>

      <div className="col-6 mb-2">
        <div className="form-check">
          <input
            className="form-check-input"
            type="checkbox"
            id="fileSubmit"
            onChange={() => handlePhaseFileSubmissionChange(id)}
            checked={setSubmission}
            disabled = {isSubmitting}
          />
          <label className="form-check-label" htmlFor="fileSubmit">
            Submissão de arquivo
          </label>
        </div>
      </div>

      <div className="col-12 mb-2">
        <label className="label">Campos de texto a serem preenchidos</label>
        {textAreas.map((item, i) => (
          <div key={i} className="d-flex mb-2">
            <div className="w-100 d-flex flex-column flex-sm-row gap-2">
              <input
                type="text"
                className="form-control"
                placeholder={`Nome do campo ${i + 1}`}
                value={textAreas[i].value}
                onChange={(e) => updatePhaseTextAreas(id, i, e.target.value)}
                maxLength="80"
                disabled = {isSubmitting}
              />
              <button
                className="btn-remove"
                onClick={() => removePhaseTextAreas(id, i)}
                disabled={textAreas.length <= 1 || isSubmitting}
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
            addPhaseTextAreas(id);
          }}
          disabled={textAreas.length >= 5 || isSubmitting}
        >
          <i className="bi bi-plus me-2 flex-shrink-0"></i>
          Adicionar campo de texto
        </button>
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
                disabled = {isSubmitting}
              />
              <button
                className="btn-remove"
                onClick={() => removePhaseCriteria(id, i)}
                disabled={criteria.length <= 1 || isSubmitting}
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
          disabled={criteria.length >= 11 || isSubmitting}
        >
          <i className="bi bi-plus me-2 flex-shrink-0"></i>
          Adicionar critério
        </button>
      </div>

      <div className="col-6 mb-2">
        <label className="label mb-2">Quantia de aprovados</label>
        <div className="input w-50">
          <input
            value={localNumberApproved}
            className="form-control mb-2 no-spinner"
            id="projectGrade"
            placeholder="Digite um número"
            type="number"
            min="0"
            onChange={handleChange}
            onBlur={handleBlur}
            disabled = {isSubmitting}
          />
        </div>
      </div>
    </div>
  );
}

export default CreatePhase;
