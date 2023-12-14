import requests
import json

import openai

openai.api_key = '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'

text = "	Improvement of Surge Shaft road by Construction of Bituminous road from (Ch. 3600.00m to Ch. 3800.00m) at Dikrong Power House site, Hoj, PLHPS, Arunachal Pradesh (Group-IV)."


text_input = f"{text} according to you what category does this tendor fall into? from the given list of category i.e Security and Infrastructure, Civil Construction, Building Construction and Renovation, Hydro-Electric Project Works, Procurement and Supply, Road Construction and Maintenance, Water Resource Management, Electrical Works, Vehicle and Transportation Services, Environmental Protection and Waste Management, Survey and Mapping, Maintenance and Repair, Insurance and Safety, Information Technology, Beautification and Painting "


category = [
    ["Safety and Facilities", "Protection and Facilities", "Defense and Structures", "Guarding and Buildings", "Safety Measures and Infrastructure", "Security Systems and Establishment",
        "Defense Mechanisms and Facilities", "Safety Protocols and Structures", "Protective Measures and Infrastructure", "Safeguarding and Buildings"],
    ["Civil Engineering", "Structural Construction", "Building Development", "Architectural Construction", "Infrastructure Building",
        "Civil Works", "Construction Engineering", "Building Projects", "Urban Construction", "Public Works"],
    ["Construction and Remodeling", "Building Development and Refurbishment", "Structure Construction and Renewal", "Edifice Building and Restoration", "Construction and Reconstruction",
        "Building Erection and Upgrading", "Construction and Overhaul", "Infrastructure Construction and Makeover", "Architectural Development and Renovation", "Building Establishment and Renewal"],
    ["Hydropower Project Tasks", "Water Power Installation Works", "Hydroelectric Development", "Water Energy Project Activities", "Hydroelectric Power Construction",
        "Hydropower Infrastructure Tasks", "Water Turbine Project Works", "Hydroelectric Facility Development", "Water Power Plant Construction", "Hydropower Installation Activities"],
    ["Acquisition and Distribution", "Purchasing and Delivery", "Procurement and Provisioning", "Sourcing and Supplying", "Obtaining and Furnishing",
        "Acquisition and Dispatch", "Procurement and Issuance", "Buying and Delivery", "Obtaining and Provisioning", "Sourcing and Distribution"],
    ["Highway Building and Upkeep", "Road Development and Care", "Street Construction and Repair", "Pathway Building and Sustenance", "Roadway Establishment and Preservation",
        "Thoroughfare Construction and Service", "Expressway Development and Repair", "Street Infrastructure and Maintenance", "Boulevard Building and Conservation", "Path Construction and Management"],
    ["Aquatic Resource Administration", "Hydro Resource Oversight", "Water Supply Control", "Aquatic Asset Governance", "Liquid Resource Management",
        "H2O Resource Supervision", "Hydrosphere Oversight", "Water Reserve Administration", "Aquifer Management", "Liquid Asset Direction"],
    ["Electric Engineering", "Wiring and Electrical Tasks", "Power System Activities", "Electrical Infrastructure", "Electric Installation",
        "Wiring and Power Development", "Electrical Network Works", "Electric Circuit Construction", "Power Grid Installation", "Electric System Tasks"],
    ["Automotive and Conveyance Services", "Transport and Vehicle Assistance", "Automobile and Transit Facilities", "Vehicle and Conveyance Solutions", "Automotive and Transportation Support",
        "Transit and Auto Services", "Motorized and Movement Aid", "Vehicle and Commuting Services", "Conveyance and Auto Assistance", "Transportation and Car Services"],
    ["Eco Conservation and Rubbish Control", "Nature Preservation and Trash Handling", "Green Protection and Refuse Administration", "Environmental Safeguard and Debris Supervision", "Ecology Preservation and Garbage Oversight",
        "Earth-Friendly Defense and Waste Control", "Conservation of Nature and Trash Management", "Eco-Friendly Preservation and Debris Handling", "Environmental Guard and Waste Supervision", "Ecological Protection and Litter Management"],
    ["Examination and Cartography", "Study and Charting", "Exploration and Cartography", "Scrutiny and Mapping", "Inspection and Diagramming",
        "Analysis and Topography", "Assessment and Plotting", "Inquiry and Mapping", "Review and Surveying", "Investigation and Blueprinting"],
    ["Upkeep and Fixing", "Care and Restoration", "Sustaining and Mending", "Preservation and Refurbishment", "Servicing and Rectification",
        "Management and Revitalization", "Sustenance and Remediation", "Conservation and Rehabilitation", "Reparation and Overhaul", "Inspection and Renewal"],
    ["Coverage and Security", "Assurance and Protection", "Policy and Safeguarding", "Security and Coverage", "Defense and Insurance",
        "Warranty and Safety", "Guarantee and Security", "Shelter and Insurance", "Safeguard and Assurance", "Indemnity and Protection"],
    ["IT (Information Technology)", "Data Technology", "Computing and Information", "Tech Information",
     "Information Systems", "Data Processing", "Computer Technology", "Digital Systems", "IT Services", "Cybernetics"],
    ["Enhancement and Coloring", "Ornamentation and Paint Application", "Adorning and Coating", "Beautifying and Pigmenting", "Embellishment and Dyeing",
        "Improvement and Tinting", "Refinement and Hue Application", "Ornamental Design and Painting", "Decor and Coloration", "Refining and Artistry"]
]


def classify_response(text_input):

    response = openai.Completion.create(
        model="text-davinci-002",
        prompt=text_input,
        max_tokens=100,
        stop=None,
        temperature=0.6
    )

    generated_response = response['choices'][0]['text'].strip()

    # classify response based on predifined list
    # for i, category_keyword in enumerate(category, 1):
    #     for keyword in category_keyword:
    #         if keyword in generated_response:
    #             return i

    # return "Unclassified"

    return generated_response


output = classify_response(text_input, category)

Class = [
    ["Security and Infrastructure"],
    ["Civil Construction"],
    ["Building Construction and Renovation"],
    ["Hydro-Electric Project Works"],
    ["Procurement and Supply"],
    ["Road Construction and Maintenance"],
    ["Water Resource Management"],
    ["Electrical Works"],
    ["Vehicle and Transportation Services"],
    ["Environmental Protection and Waste Management"],
    ["Survey and Mapping"],
    ["Maintenance and Repair"],
    ["Insurance and Safety"],
    ["Information Technology"],
    ["Beautification and Painting"]
]

# output = classify_response(text_input, category)

# print(Class[output])

for i in Class:
    if i[0] in output:
        call = i[0]


# yeh json response hai
json_output = json.dump(call)
