import React from 'react';
import { AnalysisResult } from '../types';
import { History, MapPin, Calendar, Trash2, Download, ShieldAlert, Sprout, CheckCircle } from 'lucide-react';

interface FieldLogsProps {
  logs: AnalysisResult[];
  onDeleteLog: (id: string) => void;
  onClearAll: () => void;
  onSelectLog: (log: AnalysisResult) => void;
}

export const FieldLogs: React.FC<FieldLogsProps> = ({
  logs,
  onDeleteLog,
  onClearAll,
  onSelectLog,
}) => {
  const exportCSV = () => {
    if (logs.length === 0) return;

    const headers = [
      'ID',
      'Date',
      'Crop',
      'Field Name',
      'Disease Name',
      'Scientific Name',
      'Severity',
      'Infected Surface %',
      'Confidence %',
      'Urgency',
    ];

    const rows = logs.map((log) => [
      log.id,
      log.timestamp,
      log.crop,
      `"${log.fieldName || 'Unnamed'}"`,
      `"${log.diseaseName}"`,
      `"${log.scientificName}"`,
      log.severity,
      log.unetStats?.infectedAreaPercentage || 0,
      log.overallConfidence,
      log.fieldActionUrgency,
    ]);

    const csvContent =
      'data:text/csv;charset=utf-8,' +
      [headers.join(','), ...rows.map((e) => e.join(','))].join('\n');

    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `AgriVision_Field_Disease_Logs_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const severeCount = logs.filter((l) => (l?.severity || '').includes('Severe')).length;
  const riceCount = logs.filter((l) => l.crop === 'Rice').length;
  const cornCount = logs.filter((l) => l.crop === 'Corn').length;

  return (
    <div className="space-y-6">
      
      {/* Header & Stats Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2">
              <History className="w-5 h-5 text-emerald-400" />
              <h2 className="text-xl font-bold text-white">Historical Field Scan Logs</h2>
            </div>
            <p className="text-xs text-slate-400 mt-1">
              Recorded smartphone leaf diagnostics, infected area calculations, and field plot geotags.
            </p>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={exportCSV}
              disabled={logs.length === 0}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 text-xs font-semibold flex items-center space-x-1.5 border border-slate-700 transition-all disabled:opacity-50"
            >
              <Download className="w-4 h-4 text-emerald-400" />
              <span>Export CSV</span>
            </button>

            {logs.length > 0 && (
              <button
                onClick={onClearAll}
                className="px-3 py-2 rounded-xl bg-rose-950/60 hover:bg-rose-900/60 text-rose-300 text-xs font-semibold border border-rose-800/60 transition-all"
              >
                Clear All Logs
              </button>
            )}
          </div>
        </div>

        {/* Quick Analytics Counters */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 pt-2">
          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-medium block">Total Field Scans</span>
            <span className="text-lg font-extrabold text-white">{logs.length}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-medium block">Severe Infection Outbreaks</span>
            <span className="text-lg font-extrabold text-rose-400">{severeCount}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-medium block">Rice Field Scans</span>
            <span className="text-lg font-extrabold text-emerald-400">{riceCount}</span>
          </div>

          <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 text-center">
            <span className="text-[10px] text-slate-400 font-medium block">Corn Field Scans</span>
            <span className="text-lg font-extrabold text-amber-400">{cornCount}</span>
          </div>
        </div>
      </div>

      {/* Logs Table / List */}
      {logs.length === 0 ? (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-12 text-center text-slate-400 space-y-3">
          <History className="w-12 h-12 text-slate-600 mx-auto" />
          <h3 className="text-base font-bold text-slate-300">No Field Scans Saved Yet</h3>
          <p className="text-xs max-w-sm mx-auto">
            When you run a smartphone camera or image scan, click "Save Scan" on the diagnostic report to log it here.
          </p>
        </div>
      ) : (
        <div className="space-y-3">
          {logs.map((log) => (
            <div
              key={log.id}
              className="bg-slate-900 border border-slate-800 rounded-2xl p-4 shadow-lg hover:border-slate-700 transition-all flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
              {/* Left Details */}
              <div className="flex items-center space-x-4">
                <div className="w-16 h-16 rounded-xl bg-slate-950 overflow-hidden border border-slate-800 flex-shrink-0">
                  <img src={log.imageUri} alt={log.diseaseName} className="w-full h-full object-cover" />
                </div>

                <div className="space-y-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-300 text-[10px] font-bold border border-emerald-500/30">
                      {log.crop}
                    </span>
                    <span className="text-xs text-slate-400 font-mono flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-slate-500" />
                      <span>{log.fieldName || 'Plot A'}</span>
                    </span>
                    <span className="text-xs text-slate-500">• {log.timestamp}</span>
                  </div>

                  <h4 className="text-base font-bold text-white truncate">
                    {log.diseaseName}
                  </h4>

                  <p className="text-xs text-slate-400">
                    Severity: <span className="font-semibold text-amber-400">{log.severity}</span> • Infected Leaf Area: <span className="font-semibold text-rose-400">{log.unetStats?.infectedAreaPercentage || 18.5}%</span>
                  </p>
                </div>
              </div>

              {/* Right Action Controls */}
              <div className="flex items-center space-x-3 self-end md:self-center">
                <button
                  onClick={() => onSelectLog(log)}
                  className="px-3 py-1.5 rounded-lg bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-300 text-xs font-semibold border border-emerald-500/30 transition-all"
                >
                  View Diagnosis Report
                </button>

                <button
                  onClick={() => onDeleteLog(log.id)}
                  className="p-2 rounded-lg text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 transition-all"
                  title="Delete log"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>

            </div>
          ))}
        </div>
      )}

    </div>
  );
};
