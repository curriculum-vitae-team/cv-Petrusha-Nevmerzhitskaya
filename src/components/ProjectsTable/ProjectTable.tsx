import { useMutation, useQuery } from '@apollo/client';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import {
  IconButton,
  Menu,
  MenuItem,
  Paper,
  Table,
  TableCell,
  TableContainer,
  TableHead,
  TableRow
} from '@mui/material';
import { useState } from 'react';

import { DELETE_PROJECT } from '@graphql/projects/mutation';
import { PROJECTS } from '@graphql/projects/query';
import Preloader from '../Preloader';
import {
  StyledTableBody,
  StyledTableCell
} from '../UsersTable/UsersTable.styles';
import { filterUsers, sortUsers } from './projectModifications';
import { LabelsType, SortingType } from './types';

interface AnchorType {
  anchor: HTMLButtonElement | null;
  Id: string;
}

const initialAnchor: AnchorType = {
  anchor: null,
  Id: ''
};

interface HeaderLabelType {
  label: string;
  value: LabelsType;
}

const headerLabels: HeaderLabelType[] = [
  { label: 'Project name', value: 'name' },
  { label: 'Internal name', value: 'internal_name' },
  { label: 'Domain', value: 'domain' },
  { label: 'Start date', value: 'start_date' },
  { label: 'End date', value: 'end_date' },
  { label: 'Team size', value: 'team_size' }
];

interface Props {
  search: string;
  isUserAdmin: boolean;
}

const ProjectsTable: React.FC<Props> = ({ search, isUserAdmin }) => {
  const { loading, error, data } = useQuery(PROJECTS);
  const [deleteProjectMutation] = useMutation<{ affected: number }>(
    DELETE_PROJECT
  );

  const [sorting, setSorting] = useState<SortingType>({
    name: 'internal_name',
    asc: true
  });

  const [anchorEl, setAnchorEl] = useState<AnchorType>(initialAnchor);

  const handleMenuClose = () => {
    setAnchorEl(initialAnchor);
  };

  const handleMenuOpen = (
    event: React.MouseEvent<HTMLButtonElement>,
    Id: string
  ) => {
    setAnchorEl({ anchor: event.currentTarget, Id });
  };

  const changeSort = (label: LabelsType) => {
    setSorting((prev) => ({
      name: label,
      asc: prev.name === label ? !prev.asc : true
    }));
  };

  const deleteProject = async () => {
    await deleteProjectMutation({
      variables: { id: anchorEl.Id }
    });
  };

  return (
    <Preloader loading={loading} error={error}>
      <>
        <Menu
          anchorEl={anchorEl.anchor}
          open={!!anchorEl.anchor}
          onClose={handleMenuClose}
        >
          <MenuItem>Project</MenuItem>
          <MenuItem onClick={deleteProject} disabled={!isUserAdmin}>
            Delete project
          </MenuItem>
        </Menu>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                {headerLabels.map((label) => (
                  <StyledTableCell
                    key={label.label}
                    onClick={() => changeSort(label.value)}
                  >
                    {label.label}
                    {sorting.name === label.value &&
                      (sorting.asc ? (
                        <ArrowUpwardIcon fontSize="small" />
                      ) : (
                        <ArrowDownwardIcon fontSize="small" />
                      ))}
                  </StyledTableCell>
                ))}
                <StyledTableCell padding="checkbox" />
              </TableRow>
            </TableHead>
            <StyledTableBody>
              {data &&
                sortUsers(filterUsers(data.projects, search), sorting).map(
                  (project) => (
                    <TableRow key={project.id}>
                      <TableCell>{project.name}</TableCell>
                      <TableCell>{project.internal_name}</TableCell>
                      <TableCell>{project.domain}</TableCell>
                      <TableCell>{project.start_date}</TableCell>
                      <TableCell>{project.end_date || 'Till now'}</TableCell>
                      <TableCell>{project.team_size}</TableCell>
                      <TableCell>
                        <IconButton
                          onClick={(event) => handleMenuOpen(event, project.id)}
                        >
                          <MoreVertIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  )
                )}
            </StyledTableBody>
          </Table>
        </TableContainer>
      </>
    </Preloader>
  );
};

export default ProjectsTable;
