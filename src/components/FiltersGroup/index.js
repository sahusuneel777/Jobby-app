import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FiltersGroup = props => {
  const renderTypesOfSalaryRange = () => {
    const {FilterEmployeSalary} = props
    return salaryRangesList.map(eachSalaryRange => {
      const onClickFilterEmployeSalary = () => {
        FilterEmployeSalary(eachSalaryRange.salaryRangeId)
      }
      return (
        <li
          className="employment-type-input-item"
          onClick={onClickFilterEmployeSalary}
          key={eachSalaryRange.salaryRangeId}
        >
          <input
            type="radio"
            name="salary"
            id={eachSalaryRange.salaryRangeId}
          />
          <label
            className="employee-type-label"
            htmlFor={eachSalaryRange.salaryRangeId}
          >
            {eachSalaryRange.label}
          </label>
        </li>
      )
    })
  }

  const renderTypesOfEmployment = () => {
    const {changeEmploymentType} = props
    return employmentTypesList.map(eachEmployeeType => {
      const onClickFilterEmploymentType = () =>
        changeEmploymentType(eachEmployeeType.employmentTypeId)
      return (
        <li
          className="employment-type-input-item"
          onClick={onClickFilterEmploymentType}
          key={eachEmployeeType.employmentTypeId}
        >
          <input type="checkbox" id={eachEmployeeType.employmentTypeId} />
          <label
            className="employee-type-label"
            htmlFor={eachEmployeeType.employmentTypeId}
          >
            {eachEmployeeType.label}
          </label>
        </li>
      )
    })
  }

  const typesOfEmployment = () => (
    <div className="types-of-employment-section">
      <h1 className="filter-heading">Type of employment</h1>
      <ul className="types-of-employment">{renderTypesOfEmployment()}</ul>
      <hr className="horizontal-line" />
    </div>
  )

  const typesOfSalaries = () => (
    <div className="types-of-salary-section">
      <h1 className="filter-heading"> Salary Range</h1>
      <ul className="types-of-employment">{renderTypesOfSalaryRange()}</ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {typesOfEmployment()}
      {typesOfSalaries()}
    </div>
  )
}

export default FiltersGroup
