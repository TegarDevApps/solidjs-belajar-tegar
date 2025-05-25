import { createResource } from "solid-js";
import { Show, Suspense } from "solid-js";
import { 
  Box, 
  Text,
  Heading,
  Skeleton,
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription
} from "@hope-ui/solid";
import AgGridSolid from "ag-grid-solid";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-alpine.css";

interface User {
  id: number;
  name: string;
  username: string;
  email: string;
  address: {
    street: string;
    suite: string;
    city: string;
    zipcode: string;
    geo: {
      lat: string;
      lng: string;
    };
  };
  phone: string;
  website: string;
  company: {
    name: string;
    catchPhrase: string;
    bs: string;
  };
}

const UsersTable = () => {
  const fetchUsers = async (): Promise<User[]> => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/users');
      if (!response.ok) throw new Error('Failed to fetch users');
      return await response.json();
    } catch (error) {
      console.error('Error fetching users:', error);
      throw error;
    }
  };

  const testData = [
    { id: 1, name: "John Doe", username: "johndoe", email: "john@example.com", phone: "123-456", website: "example.com", address: { city: "City A" }, company: { name: "Company A" } },
    { id: 2, name: "Jane Smith", username: "janesmith", email: "jane@example.com", phone: "789-012", website: "janesmith.com", address: { city: "City B" }, company: { name: "Company B" } },
  ];

  const [users] = createResource(fetchUsers);

  // AG Grid configuration
  const userGridColumnDefs = [
    { 
      headerName: "ID", 
      field: "id", 
      width: 80,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Name", 
      field: "name", 
      width: 180,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Username", 
      field: "username", 
      width: 150,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Email", 
      field: "email", 
      width: 220,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Phone", 
      field: "phone", 
      width: 150,
      sortable: true,
      filter: true
    },
    {
        headerName: "Website",
        field: "website",
        width: 180,
        sortable: true,
        filter: true,
        cellRenderer: (params: any) => {
            const url = params.value.startsWith("http") ? params.value : `http://${params.value}`;
            return (
                <a href={url} target="_blank" rel="noopener noreferrer" style={{ color: "#2563eb", "text-decoration": "underline" }}>
                {params.value}
                </a>
            );
        }
    },
    { 
      headerName: "City", 
      field: "address.city", 
      width: 120,
      sortable: true,
      filter: true
    },
    { 
      headerName: "Company", 
      field: "company.name", 
      width: 200,
      sortable: true,
      filter: true
    }
  ];

  const defaultColDef = {
    resizable: true,
    sortable: true,
    filter: true
  };

  return (
    <>
      <Box>
        <Heading>Users Data Table</Heading>
        <div class="ag-theme-alpine" style={{ height: "400px", width: "100%" }}>
          <AgGridSolid
            columnDefs={userGridColumnDefs}
            rowData={testData}
            defaultColDef={defaultColDef}
            headerHeight={50}
            pagination={true}
            paginationPageSize={10}
            animateRows={true}
          />
        </div>
      </Box>
      
      <Box mb="$8">
        <Heading size="xl" color="$gray800" mb="$4">
          Users Data Table (Fetched)
        </Heading>
        <Text color="$gray600" fontSize="$md" mb="$4">
          Complete user information displayed in a powerful data grid with sorting and filtering capabilities.
        </Text>
      </Box>

      <Suspense fallback={<Skeleton height="500px" />}>
        <Show
          when={users() !== undefined}
          fallback={
            <Alert status="danger">
              <AlertIcon />
              <AlertTitle>Error!</AlertTitle>
              <AlertDescription>
                Failed to load users data. Please try again later.
              </AlertDescription>
            </Alert>
          }
        >
            
          <Box bg="$white" p="$4" borderRadius="$md" shadow="$sm" w="100%">
            <div class="ag-theme-alpine" style={{ height: "500px", width: "100%" }}>
              <AgGridSolid
                columnDefs={userGridColumnDefs}
                rowData={users() ? users() : []} 
                defaultColDef={defaultColDef}
                headerHeight={50}
                pagination={true}
                paginationPageSize={10}
                animateRows={true}
                enableCellTextSelection={true}
                ensureDomOrder={true}
                suppressCellFocus={true}
              />
            </div>
          </Box>
        </Show>
      </Suspense>
    </>
  );
};

export default UsersTable;