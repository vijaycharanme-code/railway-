"use client";

import React, { useEffect, useState } from "react";

interface IncidentData {
  incident: string;
  confidence: string;
  severity: string;
}

interface ObstacleData {
  incident: string;
  type: string;
  distance: string;
}

interface RiskData {
  score: number;
  priority: string;
}

export default function Dashboard() {
  const [incidentData, setIncidentData] = useState<IncidentData | null>(null);
  const [obstacleData, setObstacleData] = useState<ObstacleData | null>(null);
  const [riskData, setRiskData] = useState<RiskData | null>(null);

  useEffect(() => {
    // Fetch data from the backend API
    const fetchData = async () => {
      try {
        const [incidentRes, obstacleRes, riskRes] = await Promise.all([
          fetch("http://localhost:8000/api/incidents"),
          fetch("http://localhost:8000/api/obstacles"),
          fetch("http://localhost:8000/api/risk"),
        ]);

        if (incidentRes.ok) setIncidentData(await incidentRes.json());
        if (obstacleRes.ok) setObstacleData(await obstacleRes.json());
        if (riskRes.ok) setRiskData(await riskRes.json());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="p-4 bg-gray-100 rounded-lg shadow-md h-full">
      <h2 className="text-2xl font-bold mb-4 text-black">RailGuard AI Control Center</h2>

      <div className="grid grid-cols-1 gap-4 text-black">
        <div className="bg-white p-4 rounded shadow border-l-4 border-red-500">
          <h3 className="font-semibold text-lg text-black">Track Incidents</h3>
          {incidentData ? (
            <div>
              <p>Type: {incidentData.incident}</p>
              <p>Severity: <span className="font-bold text-red-600">{incidentData.severity}</span></p>
              <p>Confidence: {incidentData.confidence}</p>
            </div>
          ) : <p>Loading...</p>}
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-yellow-500">
          <h3 className="font-semibold text-lg text-black">Obstacles Detected</h3>
          {obstacleData ? (
            <div>
              <p>Type: {obstacleData.type}</p>
              <p>Distance: {obstacleData.distance}</p>
            </div>
          ) : <p>Loading...</p>}
        </div>

        <div className="bg-white p-4 rounded shadow border-l-4 border-orange-500">
          <h3 className="font-semibold text-lg text-black">Risk Assessment</h3>
          {riskData ? (
            <div>
              <p>Score: {riskData.score}/100</p>
              <p>Priority: <span className="font-bold text-orange-600">{riskData.priority}</span></p>
            </div>
          ) : <p>Loading...</p>}
        </div>
      </div>
    </div>
  );
}
