import { colorSchemeDark } from 'ag-grid-community';
import { themeMaterial } from 'ag-grid-community';

export const gridTheme = themeMaterial
    .withPart(colorSchemeDark)
    .withParams(
        {
            accentColor: "#F8A626",
            headerTextColor: "#F8A626",
        }
    )