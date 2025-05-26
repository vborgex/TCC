import "./createPhase.css";

function CreatePhase() {
  return (
    <div className="row">
      <div className="col-12 mb-2">
        <label className="label fs-5">Fase nova</label>
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
          <input className="form-check-input" type="checkbox" id="fileSubmit" />
          <label className="form-check-label" htmlFor="fileSubmit">
            Submissão de arquivo
          </label>
        </div>
      </div>

      <div className="col-12 mb-2">
        <label className="label">Critérios de avaliação</label>
        <input
          className="form-control"
          placeholder="Critério"
          maxLength="100"
        />
      </div>
      <div className="col-12 d-flex align-items-end mb-1">
        <button className="btn squareBtn p-1 w-100">
          <i className="bi bi-plus me-2 flex-shrink-0"></i>Adicionar Critério
        </button>
      </div>
    </div>
  );
}

export default CreatePhase;
