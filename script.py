import csv


cols = ["Code_CS","Libellé de caractéristique","Gravité","Minimum","Maximum","Unité","Fréquence","Secteur","Tps contrôle"]
column_indices = []

inputCsv = "pds_qcp.csv"

def transpose(arr):
    if not arr:
        return []

    transposed_arr = list(map(list, zip(*arr)))

    return transposed_arr

selected_rows = None

with open(inputCsv, 'r',encoding="utf-8") as input_file:
    csv_reader = csv.reader(input_file)

    first_row = next(csv_reader)

    for column_name in cols:
        col_index = first_row.index(column_name)
        column_indices.append(col_index)

    selected_rows = [[row[i] for i in column_indices] for row in csv_reader]

selected_cols = transpose(selected_rows)

col = selected_cols[cols.index("Gravité")]
selected_cols[cols.index("Gravité")] = list(map(lambda el: "RELIABILITY" if el == "R" else "SECURITY", col))


col = selected_cols[cols.index("Minimum")]
selected_cols[cols.index("Minimum")] = list(map(lambda el: "NULL" if el == "" else float(el.replace(",",".")), col))


col = selected_cols[cols.index("Maximum")]
selected_cols[cols.index("Maximum")] = list(map(lambda el: "NULL" if el == "" else float(el.replace(",",".")), col))


col = selected_cols[cols.index("Unité")]
selected_cols[cols.index("Unité")] = list(map(lambda el: "NULL" if el == "" else el, col))

selected_rows = transpose(selected_cols)

with open('output.csv', 'w', newline='',encoding="utf-8") as output_file:
        csv_writer = csv.writer(output_file)
        csv_writer.writerow(cols)

        csv_writer.writerows(selected_rows)