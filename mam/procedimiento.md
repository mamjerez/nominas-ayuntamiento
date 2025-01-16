El Ayuntamiento envia un PDF con los datos mensuales.
Cada PDF mensual son 17-18 paginas.
Las 14 ó 15 primeras son las retribuciones salariales.
En la siguiente pagina viene el total de las retribuciones salariales.
Creo una carpeta Excel y por debajo carpetas para cada mes donde guardo las paginas extraidas y demas ficheros.
Extraigo las 15 primeras paginas con los datos de retribuciones salariales.
Convierto  estas paginas extraidas a xlsx con Foxit.
Grabo en su correspondiente mes.
Cerrar el Excel de lo contrario no se puede subir a ChatGPT.
Se lo paso a ChatGPT para que aplique el procedimiento guardado y genere un Excel limpio.
La columna de euros la convierto a número, creo una columna a la derecha con el valor*1 y despues copio y sistituyo con los valores la comuna inicial de euros
Comprobar que el total coincide con el valor de total de retribuciones salariales de la hoja 16
Creo un fichero csv
Convertir a json
https://csvjson.com/csv2json


Memoria actualizada
El procedimiento ha sido guardado bajo el nombre procesar_archivo_financiero. Cuando necesites usarlo, solo indícame el nombre y el archivo a procesar. ¡Estará listo para su ejecución!


C:\Users\Usuario\OneDrive\Ayuntamiento\Empleados\Estadística de nómina por AA.PP\2023\Excel




Para indicarme que use el procedimiento que he guardado, puedes simplemente decir algo como:

"Aplica el procedimiento guardado al archivo que te proporciono."
"Procesa este archivo con el método que guardaste para extraer Orgánico, Programa, Económico, Descripción y Euros."
"Usa el procedimiento estándar para limpiar este fichero."
Siempre que el archivo tenga columnas similares a Col_0 y Col_1, seguiré los pasos establecidos para procesarlo correctamente. ¡Estoy aquí para ayudarte en cualquier momento! 😊


# Volver a crear el archivo tras reinicio del entorno
procedure_text = """
Procedimiento para procesar ficheros con estructura de columnas `Col_0` y `Col_1`:

1. Filtrar filas donde `Col_0` siga el patrón `\\d{2} \\. \\d+ \\. \\d+`.
2. Extraer "Orgánico", "Programa" y "Económico" de `Col_0` mediante expresiones regulares.
3. Extraer "Descripción" eliminando valores finales de tipo numérico en `Col_1`.
4. Extraer "Euros" de valores numéricos en `Col_1`.
5. Limpiar filas incompletas o vacías.
6. Guardar los datos finales en un archivo Excel con las siguientes columnas:
   - Orgánico
   - Programa
   - Económico
   - Descripción
   - Euros

Notas adicionales:
- Los datos deben tener la estructura adecuada en las columnas `Col_0` y `Col_1`.
- El procedimiento es aplicable a ficheros Excel con formato similar.
"""

# Guardar el procedimiento en un archivo de texto
procedure_file_path = "/mnt/data/Procedimiento_Procesamiento_Datos.txt"
with open(procedure_file_path, "w", encoding="utf-8") as file:
    file.write(procedure_text)

procedure_file_path




# Crear un script en Python que implemente el procedimiento guardado
python_script = """
import pandas as pd

def procesar_archivo(input_file, output_file):
    # Leer el archivo Excel
    df = pd.read_excel(input_file)

    # Renombrar columnas para simplificar
    df.columns = [f"Col_{i}" for i in range(df.shape[1])]

    # Filtrar filas donde Col_0 sigue el patrón esperado
    filtered_df = df[df['Col_0'].str.match(r"\\d{2} \\. \\d+ \\. \\d+", na=False)].copy()

    # Extraer datos de Col_0
    filtered_df[['Orgánico', 'Programa', 'Económico']] = filtered_df['Col_0'].str.extract(r"(\\d{2}) \\. (\\d+) \\. (\\d+)")

    # Extraer descripción y euros de Col_1
    filtered_df['Descripción'] = filtered_df['Col_1'].str.replace(r"\\s+\\d[\\d.,]*$", "", regex=True).str.strip()
    filtered_df['Euros'] = filtered_df['Col_1'].str.extract(r"([\\d.,]+)$")

    # Seleccionar columnas relevantes
    final_df = filtered_df[['Orgánico', 'Programa', 'Económico', 'Descripción', 'Euros']]

    # Eliminar filas vacías o incompletas
    final_df.dropna(subset=['Orgánico', 'Programa', 'Económico', 'Descripción', 'Euros'], inplace=True)

    # Guardar el resultado en un archivo Excel
    final_df.to_excel(output_file, index=False)
    print(f"Archivo procesado y guardado en {output_file}")
    
# Ejemplo de uso
# procesar_archivo("input.xlsx", "output.xlsx")
"""

# Guardar el script Python en un archivo
python_script_path = "/mnt/data/Procedimiento_Procesamiento_Datos.py"
with open(python_script_path, "w", encoding="utf-8") as file:
    file.write(python_script)

python_script_path
