import styled from "@emotion/styled";

export const StyleWrapper = styled.div`
  .fc-theme-standard td,
  .fc-theme-standard th {
    padding: 3px 6px;
  }
  .fc .fc-col-header-cell-cushion {
    color: var(--muted-foreground);
  }

  .fc .fc-daygrid-day-top {
    display: flex;
    flex-direction: row;
  }
  .fc .fc-daygrid-day.fc-day-today {
    background: none;
  }

  .fc .fc-day-today .fc-daygrid-day-number {
    background-color: var(--primary);
    border-radius: 100px;
    width: 30px;
    height: 30px;
    color: var(--card);
    text-align: center;
  }
  .fc-toolbar-chunk {
    display: flex;
    gap: 8px;
  }

  .fc-toolbar-title {
    font-size: 25px;
  }

  @media only screen and (max-width: 48rem) {
    .fc-toolbar-title {
      font-size: 16px;
    }

    .fc .fc-button:not(:disabled) {
      box-shadow: none;
    }

    .fc-toolbar-chunk {
      gap: 1px;
    }


    .fc .fc-button-primary:not(:disabled).fc-button-active,
    .fc .fc-button-primary:not(:disabled):active {
      background-color: var(--primary);
      border-style: 1px solid var(--primary);
    }

    .fc .fc-button .fc-icon:hover {
    color : var(--card)
} 
  }
`;
