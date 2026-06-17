import React, { useState, useEffect } from "react";
import { createRoot } from "react-dom/client";
import { 
  Database, 
  ShieldCheck, 
  FileDown, 
  Trash2, 
  Eye, 
  Search, 
  SlidersHorizontal, 
  FileSpreadsheet, 
  Sparkles, 
  FolderPlus, 
  ExternalLink, 
  Mail, 
  Phone, 
  MessageSquare, 
  TrendingUp, 
  RefreshCcw,
  CheckCircle,
  Clock,
  Briefcase,
  Layers,
  ChevronRight,
  Globe
} from "lucide-react";
import "./index.css";

// Interface for the client-side customer inquiries matching the backend structures
interface CustomerInquiry {
  id: string;
  clientName: string;
  contact: string;
  email: string;
  productName: string;
  quantity: string;
  specifications: string;
  incoterms: string;
  status: string;
  createdAt: string;
}

type Language = "zh" | "en" | "es" | "ru";

const translations = {
  zh: {
    title: "SinoSource 跨境采购商表单与线索管理系统",
    subtitle: "全球供应链服务・实时开模质检排产监控中心",
    loginTitle: "管理员二次保密审计验证",
    loginSub: "出于跨境贸易合规与多维海关准入保密准则，访问及审阅表单线索需验证LBX机密秘钥",
    passcodeLabel: "系统访问凭证 (Authorization Passcode)",
    passcodePlaceholder: "请输入保密口令 (默认：LBX)",
    loginBtn: "安全验证并进行数据解密",
    wrongPasscode: "安全口令校验失败，请核对您的指派编号或联系保密团队。提示：默认口令为 LBX",
    totalLeads: "系统在档线索",
    pendingStatus: "总监首期评估",
    activeStatus: "排期打样/签约中",
    completedStatus: "已签署合同/完工",
    searchPlaceholder: "检索采购商、物料类别、邮箱、特殊公差规格...",
    filterAll: "完整技术提单",
    filterPending: "总监评估中",
    filterProcessing: "排单对接中",
    filterSample: "排期打样中",
    filterCompleted: "已签署合同",
    filterCanceled: "已作废归档",
    sortBy: "时间排序轴",
    sortNewest: "首发提单优先",
    sortOldest: "历史遗留优先",
    exportCsv: "生成 Excel/CSV 贸易文件",
    exportJson: "结构化备份 (JSON)",
    addMockBtn: "一键录入高规格模拟采购需求",
    idCol: "线索技术编号",
    clientCol: "采购主体与联络人",
    productCol: "寻源品类 / 计划体量",
    incotermCol: "期望国际贸易条款",
    statusCol: "调拨流转状态",
    dateCol: "录入时间",
    actionsCol: "系统动作",
    emptyNotice: "平台暂未收录针对性表单！点击上排『一键录入模范需求』可加载国际商务模板协助检验功能。",
    detailsTitle: "采购线索多维技术档案及物理参数细节",
    clientName: "采购主体（企业/个人名称）",
    contactInfo: "物理联络方式 (电话 / WhatsApp)",
    emailAddress: "企业电子邮件/技术接收函",
    productDemand: "核心采购品类名称",
    procQty: "意向采购数量",
    purchSpecs: "多维技术参数与开模公差/AQL质检要求",
    tradeIncoterms: "首选国际贸易术语 (Incoterms)",
    currentStatus: "当前运营流转状态抉择",
    updateStatusBtn: "保存技术流转状态更新",
    closeDetailBtn: "关闭技术卷宗",
    successAlert: "数据库写操作已安全提交",
    errorAlert: "发生网络或服务端接口错误",
    confirmDelete: "警告：确定要彻底销毁该宗技术采购建档吗？该行为将永久清除其记录！",
    deleteBtn: "销毁档案",
    newMockNotify: "系统解密解包成功！已录入一宗具备真实进出口质检公差的模拟采购案。",
    statusOptions: [
      { value: "Reviewing (资深总监评估中)", label: "Reviewing (资深总监评估中)" },
      { value: "Processing (排单对接中)", label: "Processing (排单对接中)" },
      { value: "Sample Phase (样件打样中)", label: "Sample Phase (样件打样中)" },
      { value: "Completed (已完成合同签署)", label: "Completed (已完成合同签署)" },
      { value: "Canceled (已作废入档)", label: "Canceled (已作废入档)" },
    ],
  },
  en: {
    title: "SinoSource Lead & Form Management Dashboard",
    subtitle: "Global Supply Chain Services · Sourcing Leads & AQL Inspection Hub",
    loginTitle: "Administrative Security Verification",
    loginSub: "To comply with international customs and confidential trade acts, enter your executive LBX credentials.",
    passcodeLabel: "System Access Credentials (Authorization Code)",
    passcodePlaceholder: "Enter security key (Default: LBX)",
    loginBtn: "Authenticate & Decrypt Dossiers",
    wrongPasscode: "Invalid authorization credentials. Hint: Default security key is 'LBX'.",
    totalLeads: "Total Sourcing Leads",
    pendingStatus: "Director Evaluation",
    activeStatus: "Molding/Sampling",
    completedStatus: "Contract Executed",
    searchPlaceholder: "Search client, material tags, email, tolerances and AQL limits...",
    filterAll: "All Dossiers",
    filterPending: "Director Review",
    filterProcessing: "Factory Routing",
    filterSample: "SLA Custom Sample",
    filterCompleted: "Contract Signed",
    filterCanceled: "Invalid / Canceled",
    sortBy: "Timeline Sorting",
    sortNewest: "Chronological (Newest)",
    sortOldest: "Chronological (Oldest)",
    exportCsv: "Export Excel/CSV Sheet",
    exportJson: "Backup JSON Database",
    addMockBtn: "Inject Simulated High-Spec Lead",
    idCol: "Lead Tech ID",
    clientCol: "Inquirer Corporate / Rep",
    productCol: "Product Target & Volume",
    incotermCol: "Requested Incoterms",
    statusCol: "Pipeline Status",
    dateCol: "Entry Timestamp",
    actionsCol: "Dossier Actions",
    emptyNotice: "Database is currently empty. Click 'Simulate' to populate industrial cluster mock data.",
    detailsTitle: "Sourcing Profile & Technical Calibration Dossier",
    clientName: "Inquiring Legal Corporate Client Entity",
    contactInfo: "Lead Contact / Socials / Mobile",
    emailAddress: "Official Contact Inbox",
    productDemand: "Strategic Sourcing Material Range",
    procQty: "Target Commercial Batch Size",
    purchSpecs: "Molding Specs, Micrometer Tolerances & AQL Targets",
    tradeIncoterms: "Commercial Conditions terms (Incoterms 2020)",
    currentStatus: "Administrative Pipeline State",
    updateStatusBtn: "Commit Administrative State Update",
    closeDetailBtn: "Close Tech Dossier",
    successAlert: "SinoSource central database updated securely",
    errorAlert: "A network error or API interface server error occurred",
    confirmDelete: "PRECAUTION: Are you sure about wiping this physical sourcing record from registry permanently?",
    deleteBtn: "Wipe File",
    newMockNotify: "Simulation transaction compiled. High-spec custom mold lead injected successfully.",
    statusOptions: [
      { value: "Reviewing (资深总监评估中)", label: "Reviewing (Evaluating)" },
      { value: "Processing (排单对接中)", label: "Processing (Routing)" },
      { value: "Sample Phase (样件打样中)", label: "Sample Phase (Sampling)" },
      { value: "Completed (已完成合同签署)", label: "Completed (Contracted)" },
      { value: "Canceled (已作废入档)", label: "Canceled (Archived)" },
    ],
  },
  es: {
    title: "Sistema de Gestión de Clientes y Formularios de SinoSource",
    subtitle: "Servicio de Cadena de Suministro Global · Centro de Inspección de Calidad y Producción en Tiempo Real",
    loginTitle: "Verificación de Seguridad Administrativa",
    loginSub: "Para cumplir con las leyes de aduanas internacionales y los acuerdos comerciales confidenciales, ingrese sus credenciales ejecutivas LBX",
    passcodeLabel: "Credenciales de Acceso al Sistema (Código de Autorización)",
    passcodePlaceholder: "Ingrese la clave de seguridad (Predeterminada: LBX)",
    loginBtn: "Autenticar y Descifrar Dossiers",
    wrongPasscode: "Clave de seguridad inválida. Pista: La clave predeterminada es 'LBX'.",
    totalLeads: "Total de Clientes Potenciales",
    pendingStatus: "Evaluación del Director",
    activeStatus: "Moldeo/Muestreo",
    completedStatus: "Contrato Ejecutado",
    searchPlaceholder: "Buscar cliente, etiquetas de material, correo electrónico, tolerancias y límites de AQL...",
    filterAll: "Todos los Dossiers",
    filterPending: "Revisión del Director",
    filterProcessing: "Enrutamiento de Fábrica",
    filterSample: "Muestra de Cliente",
    filterCompleted: "Contrato Firmado",
    filterCanceled: "Inválido / Cancelado",
    sortBy: "Ordenación de Línea de Tiempo",
    sortNewest: "Cronológico (Más Reciente)",
    sortOldest: "Cronológico (Más Antiguo)",
    exportCsv: "Exportar Hoja de Excel/CSV",
    exportJson: "Copia de Seguridad de Base de Datos JSON",
    addMockBtn: "Inyectar Cliente Simulado de Altas Prestaciones",
    idCol: "ID Técnico",
    clientCol: "Cliente Corporativo",
    productCol: "Objetivo de Producto y Volumen",
    incotermCol: "Incoterms Solicitados",
    statusCol: "Estado del Pipeline",
    dateCol: "Marca de Tiempo",
    actionsCol: "Acciones del Archivo",
    emptyNotice: "La base de datos está actualmente vacía. Haga clic en 'Inject Simulated' para rellenar con datos simulados del clúster industrial.",
    detailsTitle: "Perfil de Abastecimiento y Dossier de Calibración Técnica",
    clientName: "Entidad de Cliente Corporativo Solicitante",
    contactInfo: "Contacto Principal / Redes / Móvil",
    emailAddress: "Bandeja de Entrada Oficial",
    productDemand: "Rango Estratégico de Materiales de Abastecimiento",
    procQty: "Tamaño de Lote Comercial Target",
    purchSpecs: "Especificaciones de Moldeo, Tolerancias e Hitos de AQL",
    tradeIncoterms: "Términos Comerciales (Incoterms 2020)",
    currentStatus: "Estado del Pipeline Administrativo",
    updateStatusBtn: "Confirmar Estado de Actualización",
    closeDetailBtn: "Cerrar Dossier Técnico",
    successAlert: "Base de datos central de SinoSource actualizada de forma segura",
    errorAlert: "Ocurrió un error de red o de servidor de la interfaz API",
    confirmDelete: "Advertencia: ¿Está seguro de que desea eliminar permanentemente este registro? Esto no se puede deshacer.",
    deleteBtn: "Destruir Dossier",
    newMockNotify: "¡Descifrado y descompresión del sistema exitosos! Se ha ingresado un cliente potencial de compra simulado con tolerancias reales de inspección de importación y exportación.",
    statusOptions: [
      { value: "Reviewing (资深总监评估中)", label: "Evaluando (Senior Director Reviewing)" },
      { value: "Processing (排单对接中)", label: "Enrutamiento de Fábrica (Factory Routing)" },
      { value: "Sample Phase (样件打样中)", label: "Fase de Muestra (Custom Sampling)" },
      { value: "Completed (已完成合同签署)", label: "Contrato Firmado (Contract Executed)" },
      { value: "Canceled (已作废入档)", label: "Cancelado / Suspendido (Canceled)" },
    ],
  },
  ru: {
    title: "Система Управления Клиентами и Лидами SinoSource Global",
    subtitle: "Глобальные услуги цепочки поставок · Подача заявок и контроль качества AQL",
    loginTitle: "Административная Верификация Безопасности",
    loginSub: "Для соблюдения международных таможенных правил и законов о конфиденциальной торговле, укажите ваши исполнительные учетные данные LBX.",
    passcodeLabel: "Учетные данные Системы Доступа (Код Авторизации)",
    passcodePlaceholder: "Введите защитный ключ (По умолчанию: LBX)",
    loginBtn: "Авторизоваться и Расшифровать Досье",
    wrongPasscode: "Неверные защитные учетные данные. Подсказка: По умолчанию защитный ключ — 'LBX'.",
    totalLeads: "Всего заявок в системе",
    pendingStatus: "Оценка Директором",
    activeStatus: "Моделирование/Выборка",
    completedStatus: "Контракт Исполнен",
    searchPlaceholder: "Поиск клиента, тегов сырья, email, спецификаций и лимитов AQL...",
    filterAll: "Все Документы",
    filterPending: "Оценка Директором",
    filterProcessing: "Маршрутизация Фабрики",
    filterSample: "Разработка Образца",
    filterCompleted: "Договор Подписан",
    filterCanceled: "Аннулировано / Архив",
    sortBy: "Сортировка Списка",
    sortNewest: "Хронологический (Сначала Новые)",
    sortOldest: "Хронологический (Сначала Старые)",
    exportCsv: "Экспортировать Excel/CSV Файл",
    exportJson: "Резервная Копия Базы Данных (JSON)",
    addMockBtn: "Внедрить Лид с Реальными Спецификациями",
    idCol: "Технический ID Лида",
    clientCol: "Заявитель и Контакты",
    productCol: "Целевой Товар и Объем",
    incotermCol: "Инкотермс Лида",
    statusCol: "Статус в Цепочке",
    dateCol: "Временная Отметка",
    actionsCol: "Действия с Документами",
    emptyNotice: "База данных записей пуста в данный момент. Нажмите кнопку внедрения лида, чтобы загрузить примеры спецификаций.",
    detailsTitle: "Профиль снабжения и техническое калибровочное досье",
    clientName: "Юридическое лицо клиента",
    contactInfo: "Основной Контакт / Мессенджер / Телефон",
    emailAddress: "Официальный Email",
    productDemand: "Стратегический класс материалов снабжения",
    procQty: "Целевой Объем Парии",
    purchSpecs: "Чертежи, допуски микрометра и критические уставки AQL",
    tradeIncoterms: "Коммерческие условия сделки (Инкотермс 2020)",
    currentStatus: "Текущий Этап в Цепочке Поставок",
    updateStatusBtn: "Сохранить Обновление Статуса",
    closeDetailBtn: "Закрыть Техническое Досье",
    successAlert: "Центральная база данных SinoSource успешно обновлена",
    errorAlert: "Произошла сетевая ошибка или сбой API сервера",
    confirmDelete: "Внимание: Вы уверены, что хотите безвозвратно удалить эту запись? Действие нельзя отменить.",
    deleteBtn: "Уничтожить Досье",
    newMockNotify: "Успешная расшифровка и распаковка! Внедрена симуляция импортно-экспортного лида с реальными наборами качественных допусков.",
    statusOptions: [
      { value: "Reviewing (资深总监评估中)", label: "Оценка Директором (Reviewing)" },
      { value: "Processing (排单对接中)", label: "Маршрутизация Фабрики (Factory Routing)" },
      { value: "Sample Phase (样件打样中)", label: "Фаза Образца (Custom Sampling)" },
      { value: "Completed (已完成合同签署)", label: "Договор Исполнен (Contract Executed)" },
      { value: "Canceled (已作废入档)", label: "Аннулировано / Архив (Canceled)" },
    ],
  }
};

const mockInquiriesPool = [
  {
    clientName: "KAWASAKI MECHANICAL PRECISION LTD",
    contact: "+81 45 471 2282 (Hiroshi Saito)",
    email: "h.saito@kawasaki-precision.co.jp",
    productName: "High-Tensile T4 Hex CNC Titanium Bolts",
    quantity: "45,000 Pcs",
    specifications: "ISO 4762 Standard compliance. Max tolerance ±0.02mm, strict AQL 1.0 inspection limit. Clean satin passivated surface treatment. For automotive assembly.",
    incoterms: "FOB Osaka Port",
    status: "Processing (排单对接中)"
  },
  {
    clientName: "NORDIC HOMEWARE GRUPPEN AB",
    contact: "+46 8 522 5500 (Elin Larsson)",
    email: "procure@nordic-homeware.se",
    productName: "Eco-Friendly Molded Bamboo Fiber Dinnerware Sets",
    quantity: "12,000 Sets",
    specifications: "FDA food-grade certified, BPA Free, LFGB compliant. Pantone Warm Gray 2C lacquer, silk-print organic leaf emblem at base. Packed in recycled raw Kraft cartons.",
    incoterms: "DDP Shanghai Port to Stockholm Warehouse",
    status: "Sample Phase (样件打样中)"
  },
  {
    clientName: "APEX SPORTING SOLUTIONS INC",
    contact: "+1 (305) 555-8120 (John Miller)",
    email: "jmiller@apex-sports.com",
    productName: "High-Density Natural Rubber Yoga Mats (6mm)",
    quantity: "8,500 Pcs",
    specifications: "Non-slip dual texture profile. Laser-engraved geometric grid lines. Moisture-resistant closed-cell vulcanized rubber. Direct weight verification per carton.",
    incoterms: "CIF Miami Port",
    status: "Reviewing (资深总监评估中)"
  },
  {
    clientName: "SYDNEY INDUSTRIAL MARINE CO",
    contact: "+61 2 9233 4110 (Dave O'Connor)",
    email: "dave.oconnor@sydmarine.com.au",
    productName: "Stainless Steel Marine Grade Lock Latches",
    quantity: "3,000 Pcs",
    specifications: "S31608 electrochemical polish, mirror surface standard, salt spray chamber test rating exceeding 720 hours without oxygenation dots. Pre-loaded silicone sealant gaskets.",
    incoterms: "FOB Ningbo Port",
    status: "Completed (已完成合同签署)"
  },
  {
    clientName: "BERLIN SOLAR ACCU TEC",
    contact: "+49 30 8943 112 (Dieter Becker)",
    email: "b2b@solar-accutec.de",
    productName: "Custom ABS Solar Inverter Shell Enclosures",
    quantity: "6,000 Pcs",
    specifications: "Injection molded high-impact ABS, fire retardant UL94-V0 compliance. Integrated aluminum heat-sink slotting inserts. Front panel customized embossing.",
    incoterms: "FOB Ningbo Port",
    status: "Reviewing (资深总监评估中)"
  }
];

export default function AdminApp() {
  const [lang, setLang] = useState<Language>(() => {
    const cached = localStorage.getItem("sinosourse_admin_lang");
    return (cached === "zh" || cached === "en" || cached === "es" || cached === "ru") ? cached as Language : "zh";
  });

  const [passcode, setPasscode] = useState("");
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem("sinosourse_admin_authorized") === "true";
  });
  const [authError, setAuthError] = useState("");

  const [inquiries, setInquiries] = useState<CustomerInquiry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  // Search & Filter System States
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [sortOrder, setSortOrder] = useState<"newest" | "oldest">("newest");

  // Selected Inquiry Technical Detail Modal
  const [selectedInquiry, setSelectedInquiry] = useState<CustomerInquiry | null>(null);
  const [isUpdatingStatus, setIsUpdatingStatus] = useState(false);
  const [editingStatus, setEditingStatus] = useState("");

  // Double Click deletion confirmation helper
  const [pendingDeleteId, setPendingDeleteId] = useState<string | null>(null);

  // Sync state & Fetch lead list
  useEffect(() => {
    localStorage.setItem("sinosourse_admin_lang", lang);
  }, [lang]);

  useEffect(() => {
    if (isAuthorized) {
      fetchInquiries();
    }
  }, [isAuthorized]);

  const fetchInquiries = async () => {
    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/inquiries");
      if (!response.ok) {
        throw new Error("HTTP error " + response.status);
      }
      const data = await response.json();
      setInquiries(data);
    } catch (err: any) {
      console.error("Fetch inquiries error:", err);
      setErrorMessage(translations[lang].errorAlert);
      
      // Fallback to local storage if node server is temporarily unresponsive
      const fallbackData = localStorage.getItem("sinosourse_local_inquiries");
      if (fallbackData) {
        try {
          setInquiries(JSON.parse(fallbackData));
        } catch (_) {}
      }
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setAuthError("");
    const formattedCode = passcode.trim().toUpperCase();
    
    if (formattedCode === "LBX") {
      setIsAuthorized(true);
      localStorage.setItem("sinosourse_admin_authorized", "true");
    } else {
      setAuthError(translations[lang].wrongPasscode);
    }
  };

  const handleLogout = () => {
    setIsAuthorized(false);
    localStorage.removeItem("sinosourse_admin_authorized");
    setPasscode("");
  };

  // Status update
  const handleUpdateStatus = async (inqId: string, newStatus: string) => {
    setIsUpdatingStatus(true);
    setErrorMessage("");
    try {
      const response = await fetch(`/api/inquiries/${inqId}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ status: newStatus })
      });

      if (!response.ok) throw new Error("Status commit failed");
      const updatedItem = await response.json();
      
      // Update local client list
      setInquiries(prev => prev.map(item => item.id === inqId ? { ...item, status: newStatus } : item));
      
      // Also sync back to local storage if any
      const cached = localStorage.getItem("sinosourse_local_inquiries");
      if (cached) {
        try {
          const list: CustomerInquiry[] = JSON.parse(cached);
          const idx = list.findIndex(i => i.id === inqId);
          if (idx !== -1) {
            list[idx].status = newStatus;
            localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(list));
          }
        } catch (_) {}
      }

      setSuccessMessage(translations[lang].successAlert);
      setTimeout(() => setSuccessMessage(""), 3000);

      // Synced modal detail state
      if (selectedInquiry && selectedInquiry.id === inqId) {
        setSelectedInquiry(prev => prev ? { ...prev, status: newStatus } : null);
      }
    } catch (err: any) {
      console.error(err);
      setErrorMessage(translations[lang].errorAlert);
    } finally {
      setIsUpdatingStatus(false);
    }
  };

  // Archive / Delete inquiry
  const handleDeleteInquiry = async (inqId: string) => {
    setErrorMessage("");
    try {
      const response = await fetch(`/api/inquiries/${inqId}`, {
        method: "DELETE"
      });

      if (!response.ok) throw new Error("Delete action failed");

      setInquiries(prev => prev.filter(item => item.id !== inqId));

      // Also clean offline list
      const cached = localStorage.getItem("sinosourse_local_inquiries");
      if (cached) {
        try {
          const list: CustomerInquiry[] = JSON.parse(cached);
          const filtered = list.filter(i => i.id !== inqId);
          localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(filtered));
        } catch (_) {}
      }

      if (selectedInquiry?.id === inqId) {
        setSelectedInquiry(null);
      }

      setPendingDeleteId(null);
      setSuccessMessage(translations[lang].successAlert);
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (err) {
      console.error(err);
      setErrorMessage(translations[lang].errorAlert);
    }
  };

  // Adding simulation data to demonstrate system capabilities and quick seeding
  const handleAddMockLead = async () => {
    // Pick a random mock from our rich pool
    const idx = Math.floor(Math.random() * mockInquiriesPool.length);
    const blueprint = mockInquiriesPool[idx];

    setIsLoading(true);
    setErrorMessage("");
    try {
      const response = await fetch("/api/inquiries", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          clientName: blueprint.clientName,
          contact: blueprint.contact,
          email: blueprint.email,
          productName: blueprint.productName,
          quantity: blueprint.quantity,
          specifications: blueprint.specifications,
          incoterms: blueprint.incoterms
        })
      });

      if (!response.ok) throw new Error("Seed failed");
      const savedInquiry = await response.json();

      // Since mock items may already specify a certain custom status that we want to preserve:
      if (blueprint.status && blueprint.status !== "Reviewing (资深总监评估中)") {
        // Immediately make a background update call to match the mock cluster status
        await fetch(`/api/inquiries/${savedInquiry.id}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ status: blueprint.status })
        });
        savedInquiry.status = blueprint.status;
      }

      // Add to state
      setInquiries(prev => [savedInquiry, ...prev]);

      // Add to offline sync cache as well
      const cached = localStorage.getItem("sinosourse_local_inquiries") || "[]";
      try {
        const list = JSON.parse(cached);
        list.unshift(savedInquiry);
        localStorage.setItem("sinosourse_local_inquiries", JSON.stringify(list));
      } catch (_) {}

      setSuccessMessage(translations[lang].newMockNotify);
      setTimeout(() => setSuccessMessage(""), 4000);
    } catch (err) {
      console.error(err);
      setErrorMessage(translations[lang].errorAlert);
    } finally {
      setIsLoading(false);
    }
  };

  // Safe Excel/CSV file generation
  const handleExportCSV = () => {
    const headers = [
      "Lead ID", 
      "Client Name", 
      "Inquiries Email", 
      "Contact Info", 
      "Product Name", 
      "Quantity Requested", 
      "Technical specifications", 
      "Incoterms Requested", 
      "Dossier Pipeline Status", 
      "Creation Date"
    ];

    const rows = filteredAndSortedInquiries.map(inq => [
      inq.id || "N/A",
      `"${inq.clientName.replace(/"/g, '""')}"`,
      inq.email,
      `"${inq.contact.replace(/"/g, '""')}"`,
      `"${inq.productName.replace(/"/g, '""')}"`,
      `"${inq.quantity.replace(/"/g, '""')}"`,
      `"${inq.specifications.replace(/"/g, '""').replace(/\n/g, ' ')}"`,
      `"${inq.incoterms.replace(/"/g, '""')}"`,
      `"${inq.status.replace(/"/g, '""')}"`,
      new Date(inq.createdAt).toLocaleString()
    ]);

    // Construct the UTF-8 CSV with BOM so Microsoft Excel can display Chinese characters correctly
    const BOM = "\uFEFF";
    const csvContent = BOM + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.setAttribute("href", url);
    link.setAttribute("download", `SinoSource_Sourcing_Leads_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Raw JSON format direct export fallback
  const handleExportJSON = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(inquiries, null, 2));
    const link = document.createElement("a");
    link.setAttribute("href", dataStr);
    link.setAttribute("download", `SinoSource_Inquiries_Database_Backup.json`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Filter and Sort calculation
  const filteredAndSortedInquiries = inquiries
    .filter(inq => {
      // 1. Core category status filter
      if (statusFilter !== "All") {
        if (statusFilter === "Reviewing" && !inq.status.includes("Reviewing")) return false;
        if (statusFilter === "Processing" && !inq.status.includes("Processing")) return false;
        if (statusFilter === "Sample Phase" && !inq.status.includes("Sample Phase")) return false;
        if (statusFilter === "Completed" && !inq.status.includes("Completed")) return false;
        if (statusFilter === "Canceled" && !inq.status.includes("Canceled")) return false;
      }

      // 2. Full text custom searching criteria
      if (searchTerm.trim() !== "") {
        const query = searchTerm.toLowerCase();
        return (
          inq.id?.toLowerCase().includes(query) ||
          inq.clientName.toLowerCase().includes(query) ||
          inq.email.toLowerCase().includes(query) ||
          inq.contact.toLowerCase().includes(query) ||
          inq.productName.toLowerCase().includes(query) ||
          inq.specifications.toLowerCase().includes(query) ||
          inq.incoterms.toLowerCase().includes(query) ||
          inq.status.toLowerCase().includes(query)
        );
      }
      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.createdAt).getTime();
      const timeB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? timeB - timeA : timeA - timeB;
    });

  // Calculate statistics metrics
  const statsTotal = inquiries.length;
  const statsReviewing = inquiries.filter(i => i.status.includes("Reviewing")).length;
  const statsActive = inquiries.filter(i => i.status.includes("Processing") || i.status.includes("Sample Phase")).length;
  const statsCompleted = inquiries.filter(i => i.status.includes("Completed")).length;

  const t = translations[lang];

  const T = (zh: string, en: string, es?: string, ru?: string) => {
    if (lang === "zh") return zh;
    if (lang === "es") return es || en;
    if (lang === "ru") return ru || en;
    return en;
  };

  // 1. PASSWORD SHIELD SCREEN
  if (!isAuthorized) {
    return (
      <div className="min-h-screen bg-[#020617] text-white flex flex-col justify-between p-6 relative overflow-hidden font-sans">
        {/* Subtle geometric grid background pattern indicating high secure workspace */}
        <div className="absolute inset-0 z-0 bg-[linear-gradient(to_right,#1e293b12_1px,transparent_1px),linear-gradient(to_bottom,#1e293b12_1px,transparent_1px)] bg-[size:24px_24px] opacity-60"></div>
        <div className="absolute -top-40 -right-40 w-96 h-96 bg-[#c5a059]/10 rounded-full blur-3xl z-0"></div>
        <div className="absolute -bottom-40 -left-40 w-96 h-96 bg-[#003580]/20 rounded-full blur-3xl z-0"></div>

        {/* Dynamic header inside login */}
        <header className="relative z-10 flex justify-between items-center max-w-6xl w-full mx-auto py-4">
          <div className="flex items-center space-x-2.5">
            <span className="w-8 h-8 rounded-sm bg-[#c5a059] flex items-center justify-center font-black text-slate-950 text-base shadow-lg tracking-tighter">S</span>
            <span className="font-sans font-black text-[15px] tracking-widest text-[#c5a059] uppercase">SinoSource Private Portal</span>
          </div>
          
          {/* Four-language picker */}
          <div className="flex bg-slate-900 border border-slate-800 p-1 gap-1">
            {(["en", "zh", "es", "ru"] as Language[]).map((l) => (
              <button
                type="button"
                key={l}
                id={`lang-switch-${l}`}
                onClick={() => setLang(l)}
                className={`text-[10px] font-black tracking-wider px-2.5 py-1 uppercase transition-all duration-200 cursor-pointer ${lang === l ? "bg-[#c5a059] text-slate-950 font-black" : "text-slate-400 hover:text-white"}`}
              >
                {l === "zh" ? "中" : l}
              </button>
            ))}
          </div>
        </header>

        {/* Code Entry Shield Container */}
        <main className="relative z-10 flex-grow flex items-center justify-center py-12 px-4">
          <div className="w-full max-w-md bg-slate-900/80 backdrop-blur-md border border-slate-800 p-8 rounded-sm shadow-2xl relative">
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-slate-950 border border-slate-800 rounded-full flex items-center justify-center text-[#c5a059] shadow-xl">
              <ShieldCheck className="w-6 h-6" />
            </div>

            <div className="text-center mt-4 mb-8">
              <h1 className="text-lg font-black text-white uppercase tracking-wider">{t.loginTitle}</h1>
              <p className="text-xs text-slate-400 mt-2 leading-relaxed">{t.loginSub}</p>
            </div>

            <form onSubmit={handleLogin} className="space-y-5">
              <div>
                <label className="block text-[11px] font-black uppercase tracking-wider text-[#c5a059] mb-2">
                  {t.passcodeLabel}
                </label>
                <input 
                  type="password"
                  required
                  placeholder={t.passcodePlaceholder}
                  value={passcode}
                  onChange={(e) => setPasscode(e.target.value)}
                  className="w-full bg-slate-950/80 border border-slate-800 focus:border-[#c5a059] text-white px-4 py-3 rounded-sm text-center text-sm tracking-widest outline-none transition uppercase"
                  autoFocus
                />
              </div>

              {authError && (
                <div className="p-3 bg-red-950/40 border border-red-900/60 rounded-sm text-center">
                  <p className="text-xs text-red-300 font-medium leading-relaxed">{authError}</p>
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-[#c5a059] hover:bg-yellow-500 text-slate-950 py-3 rounded-sm font-black text-xs uppercase tracking-wider transition-all duration-300 shadow-lg cursor-pointer transform hover:scale-[1.01]"
              >
                {t.loginBtn}
              </button>
            </form>
          </div>
        </main>

        {/* Footer info inside shield */}
        <footer className="relative z-10 text-center py-6 border-t border-slate-900 max-w-6xl w-full mx-auto">
          <p className="text-[10px] text-slate-500 font-mono">
            SinoSource Procurement Cryptography Engine v4.81・All rights reserved &copy; 2026
          </p>
        </footer>
      </div>
    );
  }

  // 2. MAIN SECURED DASHBOARD SYSTEM
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex flex-col font-sans selection:bg-[#c5a059]/40">
      
      {/* Dynamic alerts */}
      {successMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-slate-950 border-l-4 border-emerald-500 p-4 rounded bg-opacity-95 shadow-2xl animate-bounce flex items-center space-x-3 text-white max-w-sm">
          <div className="w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
            <CheckCircle className="w-4 h-4 text-slate-950" />
          </div>
          <div>
            <p className="text-xs font-black">{T("系统更新", "System Update", "Actualización del Sistema", "Обновление Системы")}</p>
            <p className="text-[11px] text-slate-300 mt-0.5 leading-snug">{successMessage}</p>
          </div>
        </div>
      )}

      {errorMessage && (
        <div className="fixed bottom-6 right-6 z-50 bg-red-950 border-l-4 border-red-500 p-4 rounded bg-opacity-95 shadow-2xl flex items-center space-x-3 text-white max-w-sm">
          <div className="w-6 h-6 bg-red-500 rounded-full flex items-center justify-center">
            <Trash2 className="w-4 h-4 text-white" />
          </div>
          <div>
            <p className="text-xs font-black">{T("操作阻滞", "Action Blocked", "Acción Bloqueada", "Действие Заблокировано")}</p>
            <p className="text-[11px] text-red-100 mt-0.5 leading-snug">{errorMessage}</p>
          </div>
        </div>
      )}

      {/* Corporate Dashboard Header */}
      <header className="bg-slate-950 border-b border-slate-800 text-white shrink-0 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3.5 flex flex-col sm:flex-row justify-between items-center gap-4">
          
          {/* Logo Brand */}
          <div className="flex items-center space-x-3">
            <div className="w-9 h-9 rounded-sm bg-[#c5a059] flex items-center justify-center font-black text-slate-950 text-lg shadow-md tracking-tighter shrink-0">
              S
            </div>
            <div>
              <div className="flex items-center space-x-2">
                <h1 className="text-sm font-black uppercase tracking-widest text-[#c5a059]">SinoSource Backend</h1>
                <span className="text-[9px] uppercase font-mono px-1.5 py-0.5 bg-[#c5a059]/10 text-[#c5a059] rounded-sm font-bold border border-[#c5a059]/20">Dossier-Secured</span>
              </div>
              <p className="text-[10px] text-slate-400 font-mono tracking-tight">{t.subtitle}</p>
            </div>
          </div>

          {/* Quick System controls */}
          <div className="flex items-center gap-3">
            
            {/* Seed Mock */}
            <button
              onClick={handleAddMockLead}
              className="px-3 py-1.5 bg-slate-900 border border-slate-800 hover:border-[#c5a059]/30 text-[#c5a059] hover:bg-slate-950 rounded-sm text-xs font-bold transition flex items-center space-x-1.5 cursor-pointer"
              title={t.addMockBtn}
            >
              <FolderPlus className="w-3.5 h-3.5" />
              <span className="hidden md:inline">{t.addMockBtn}</span>
              <span className="md:hidden">{T("模拟线索", "Simulate", "Simular", "Симулировать")}</span>
            </button>

            {/* Refresh */}
            <button
              onClick={fetchInquiries}
              disabled={isLoading}
              className={`p-1.5 bg-slate-900 border border-slate-800 text-slate-300 hover:text-white rounded-sm transition cursor-pointer ${isLoading ? "animate-spin" : ""}`}
              title="Refresh"
            >
              <RefreshCcw className="w-3.5 h-3.5" />
            </button>

            {/* Four-language picker */}
            <div className="flex bg-slate-900 border border-slate-800 p-1 rounded-sm gap-1">
              {(["en", "zh", "es", "ru"] as Language[]).map((l) => (
                <button
                  type="button"
                  key={l}
                  id={`lang-switch-auth-${l}`}
                  onClick={() => setLang(l)}
                  className={`text-[10px] font-black tracking-wider px-2 py-0.5 rounded-sm uppercase transition-all duration-200 cursor-pointer ${lang === l ? "bg-[#c5a059] text-slate-950 font-black" : "text-slate-400 hover:text-white"}`}
                >
                  {l === "zh" ? "中" : l}
                </button>
              ))}
            </div>

            {/* Logout Shield */}
            <button
              onClick={handleLogout}
              className="px-3 py-1.5 bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 text-red-300 hover:text-red-200 rounded-sm text-xs font-black transition cursor-pointer"
            >
              Exit
            </button>
          </div>

        </div>
      </header>

      {/* Scrollable Workspace Dashboard Body */}
      <main className="flex-grow max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        
        {/* Metric Cards Bento Grid */}
        <section className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          
          {/* Card 1: Total Leads */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-sm shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-slate-800 text-[#c5a059]">
              <Database className="w-5 h-5 flex-shrink-0" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-[#c5a059]">{t.totalLeads}</p>
              <p className="text-2xl font-black text-white mt-1">{statsTotal}</p>
            </div>
          </div>

          {/* Card 2: Initial Director Review */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-sm shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-slate-800 text-amber-500">
              <Clock className="w-5 h-5 flex-shrink-0" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{t.pendingStatus}</p>
              <p className="text-2xl font-black text-white mt-1">{statsReviewing}</p>
            </div>
          </div>

          {/* Card 3: Active Samples & Matching */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-sm shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-slate-800 text-blue-500">
              <Layers className="w-5 h-5 flex-shrink-0" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{t.activeStatus}</p>
              <p className="text-2xl font-black text-white mt-1">{statsActive}</p>
            </div>
          </div>

          {/* Card 4: Executive Contracts */}
          <div className="bg-slate-950/80 border border-slate-800 p-4 rounded-sm shadow-md flex items-center space-x-4">
            <div className="w-10 h-10 bg-slate-900 rounded-full flex items-center justify-center shrink-0 border border-slate-800 text-emerald-500">
              <CheckCircle className="w-5 h-5 flex-shrink-0" />
            </div>
            <div>
              <p className="text-[10px] uppercase font-black tracking-widest text-slate-400">{t.completedStatus}</p>
              <p className="text-2xl font-black text-white mt-1">{statsCompleted}</p>
            </div>
          </div>

        </section>

        {/* Filters and Search toolbar container */}
        <section className="bg-slate-950/60 border border-slate-800 p-4 rounded-sm flex flex-col md:flex-row md:items-center justify-between gap-4">
          
          {/* Sourcing Keyword Search */}
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-500">
              <Search className="w-4 h-4" />
            </div>
            <input 
              type="text"
              placeholder={t.searchPlaceholder}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-slate-900 border border-slate-800 focus:border-[#c5a059] text-xs text-slate-200 pl-9 pr-4 py-2.5 rounded-sm outline-none transition"
            />
          </div>

          {/* Inline filters */}
          <div className="flex flex-wrap items-center gap-3">
            
            {/* Status tabs select */}
            <div className="flex flex-wrap bg-slate-900 p-1 rounded-sm border border-slate-800 text-xs">
              {[
                { key: "All", label: t.filterAll },
                { key: "Reviewing", label: T("总监评估中", "Evaluating", "Evaluación", "Оценка") },
                { key: "Processing", label: T("排单中", "Routing", "Enrutamiento", "Маршрутизация") },
                { key: "Sample Phase", label: T("样打中", "Sampling", "Muestreo", "Выборка") },
                { key: "Completed", label: T("已签约", "Contracted", "Contratado", "Контракт") },
                { key: "Canceled", label: T("作废", "Canceled", "Cancelado", "Аннулировано") }
              ].map(opt => (
                <button
                  key={opt.key}
                  onClick={() => setStatusFilter(opt.key)}
                  className={`px-3 py-1 rounded-sm text-[10px] font-black uppercase transition-all cursor-pointer ${statusFilter === opt.key ? "bg-[#c5a059] text-slate-950" : "text-slate-400 hover:text-white"}`}
                >
                  {opt.label}
                </button>
              ))}
            </div>

            {/* Chronological order */}
            <select
              value={sortOrder}
              onChange={(e) => setSortOrder(e.target.value as "newest" | "oldest")}
              className="bg-slate-900 border border-slate-800 text-slate-300 text-[11px] px-3 py-1.5 rounded-sm outline-none focus:border-[#c5a059] font-bold cursor-pointer"
            >
              <option value="newest">{t.sortNewest}</option>
              <option value="oldest">{t.sortOldest}</option>
            </select>

            {/* Custom Excel/CSV export trigger */}
            <button
              onClick={handleExportCSV}
              disabled={filteredAndSortedInquiries.length === 0}
              className="px-3.5 py-1.5 bg-[#003580] border border-blue-900/50 hover:bg-blue-800 text-white rounded-sm text-[11px] font-black transition flex items-center space-x-1.5 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              title={t.exportCsv}
            >
              <FileSpreadsheet className="w-3.5 h-3.5" />
              <span>CSV</span>
            </button>

            {/* Backup JSON */}
            <button
              onClick={handleExportJSON}
              disabled={inquiries.length === 0}
              className="px-2.5 py-1.5 bg-slate-900 border border-slate-800 hover:border-slate-700 text-slate-400 hover:text-slate-200 rounded-sm text-[11px] tracking-tight transition cursor-pointer disabled:opacity-50"
              title={t.exportJson}
            >
              <FileDown className="w-3.5 h-3.5" />
            </button>

          </div>

        </section>

        {/* Main inquiries list/table area */}
        <section className="bg-slate-950/80 border border-slate-800 rounded-sm overflow-hidden shadow-2xl">
          
          {isLoading ? (
            <div className="py-24 text-center space-y-3">
              <div className="w-8 h-8 border-4 border-t-[#c5a059] border-slate-800 rounded-full animate-spin mx-auto"></div>
              <p className="text-xs text-slate-400 font-mono">Querrying real-time records from port queue...</p>
            </div>
          ) : filteredAndSortedInquiries.length === 0 ? (
            <div className="py-24 px-6 text-center max-w-md mx-auto space-y-4">
              <Database className="w-12 h-12 text-slate-700 mx-auto" />
              <div>
                <p className="text-sm font-black text-slate-300">{t.emptyNotice}</p>
                <p className="text-[11px] text-slate-500 mt-2 leading-relaxed">
                  {T(
                    "数据库或检索缓存当前为零。系统自带国际港口贸易场景物料检测池，点击右上角「一键录入」可以直接添加高级拟真数据。",
                    "No data matches your criteria. Use 'Inject Simulated High-Spec Lead' in the header to populate realistic entries.",
                    "La base de datos o el caché de búsqueda está actualmente vacío. Utilice 'Inyectar' para rellenar con datos.",
                    "База данных записей в КНР пуста. Нажмите кнопку внедрения лида, чтобы загрузить примеры спецификаций."
                  )}
                </p>
              </div>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-950 text-slate-400 border-b border-slate-800 text-[10px] font-black uppercase tracking-wider">
                    <th className="py-3.5 px-4">{t.idCol}</th>
                    <th className="py-3.5 px-4">{t.clientCol}</th>
                    <th className="py-3.5 px-4">{t.productCol}</th>
                    <th className="py-3.5 px-4">{t.incotermCol}</th>
                    <th className="py-3.5 px-4">{t.statusCol}</th>
                    <th className="py-3.5 px-4">{t.dateCol}</th>
                    <th className="py-3.5 px-4 text-center">{t.actionsCol}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-900">
                  {filteredAndSortedInquiries.map((inq, index) => {
                    
                    // Style status badge
                    let badgeClass = "bg-slate-900 text-slate-400 border-slate-800";
                    if (inq.status.includes("Reviewing")) badgeClass = "bg-amber-950/40 text-amber-500 border-amber-900/40";
                    else if (inq.status.includes("Processing")) badgeClass = "bg-sky-950/40 text-sky-400 border-sky-900/40";
                    else if (inq.status.includes("Sample Phase")) badgeClass = "bg-indigo-950/40 text-indigo-400 border-indigo-900/40";
                    else if (inq.status.includes("Completed")) badgeClass = "bg-emerald-950/40 text-emerald-400 border-emerald-900/40";
                    else if (inq.status.includes("Canceled")) badgeClass = "bg-red-950/40 text-red-500 border-red-900/40";

                    return (
                      <tr 
                        key={inq.id} 
                        className="hover:bg-slate-900/50 transition duration-150 group"
                      >
                        {/* ID */}
                        <td className="py-4 px-4 font-mono font-bold text-slate-400 whitespace-nowrap">
                          {inq.id}
                        </td>

                        {/* Client details */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-200 group-hover:text-white transition max-w-xs truncate" title={inq.clientName}>
                            {inq.clientName}
                          </div>
                          <div className="text-[10px] text-slate-500 font-mono mt-0.5 truncate max-w-xs">
                            {inq.email}
                          </div>
                        </td>

                        {/* Product and volume */}
                        <td className="py-4 px-4">
                          <div className="font-bold text-slate-300 max-w-xs truncate" title={inq.productName}>
                            {inq.productName}
                          </div>
                          <div className="text-[10px] text-[#c5a059] font-mono font-black mt-0.5">
                            {T("计划数: ", "Qty: ", "Cant: ", "Кол-во: ")}{inq.quantity}
                          </div>
                        </td>

                        {/* Incoterms requested */}
                        <td className="py-4 px-4 font-mono font-medium text-slate-400">
                          {inq.incoterms}
                        </td>

                        {/* Dropdown status update of pipeline directly */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <select
                            value={inq.status}
                            onChange={(e) => handleUpdateStatus(inq.id, e.target.value)}
                            className={`text-[10px] font-black border uppercase tracking-wide px-2.5 py-1 rounded-sm bg-slate-950 text-left cursor-pointer transition ${badgeClass}`}
                          >
                            <option value="Reviewing (资深总监评估中)">
                              {T("Reviewing 评估中", "Reviewing", "Evaluación (Reviewing)", "Оценка (Reviewing)")}
                            </option>
                            <option value="Processing (排单对接中)">
                              {T("Processing 工序对接", "Processing", "Enrutamiento (Processing)", "Маршрутизация (Processing)")}
                            </option>
                            <option value="Sample Phase (样件打样中)">
                              {T("Sample Phase 试模打样", "Sample Phase", "Muestreo (Sample Phase)", "Выборка (Sample Phase)")}
                            </option>
                            <option value="Completed (已完成合同签署)">
                              {T("Completed 签订契约", "Completed", "Contrato (Completed)", "Контракт (Completed)")}
                            </option>
                            <option value="Canceled (已作废入档)">
                              {T("Canceled 卷宗作废", "Canceled", "Cancelado (Canceled)", "Аннулировано (Canceled)")}
                            </option>
                          </select>
                        </td>

                        {/* Entry date */}
                        <td className="py-4 px-4 font-mono text-slate-500 whitespace-nowrap">
                          {new Date(inq.createdAt).toLocaleDateString(
                            lang === "zh" ? "zh-CN" : lang === "es" ? "es-ES" : lang === "ru" ? "ru-RU" : "en-US",
                            {
                              year: "numeric",
                              month: "2-digit",
                              day: "2-digit"
                            }
                          )}
                        </td>

                        {/* Tech action tools */}
                        <td className="py-4 px-4 whitespace-nowrap">
                          <div className="flex items-center justify-center space-x-2">
                            
                            {/* View Detail Folder code */}
                            <button
                              onClick={() => {
                                setSelectedInquiry(inq);
                                setEditingStatus(inq.status);
                              }}
                              className="p-1.5 bg-slate-900 border border-slate-800 hover:border-[#c5a059] text-[#c5a059] rounded-sm transition cursor-pointer"
                              title="Inspect Tech Folder"
                            >
                              <Eye className="w-3.5 h-3.5" />
                            </button>

                            {/* Wipe/Destroy code registry */}
                            {pendingDeleteId === inq.id ? (
                              <button
                                onClick={() => handleDeleteInquiry(inq.id)}
                                onMouseLeave={() => setPendingDeleteId(null)}
                                className="px-2 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-sm text-[9px] font-black uppercase transition-all animate-pulse cursor-pointer"
                                title="Click again to absolute wipe"
                              >
                                {T("确毁?", "Wipe?", "¿Borrar?", "Удалить?")}
                              </button>
                            ) : (
                              <button
                                onClick={() => setPendingDeleteId(inq.id)}
                                className="p-1.5 bg-slate-900 border border-slate-800 hover:border-red-500/50 text-slate-500 hover:text-red-400 rounded-sm transition cursor-pointer"
                                title="Wipe Register Record"
                              >
                                <Trash2 className="w-3.5 h-3.5" />
                              </button>
                            )}

                          </div>
                        </td>

                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}

        </section>

      </main>

      {/* FOOTER CORPORATE FOOTPRINT */}
      <footer className="bg-slate-950 border-t border-slate-800 py-6 text-center text-slate-500 mt-12 shrink-0">
        <p className="text-[10px] uppercase font-mono tracking-widest text-[#c5a059]">SinoSource Automated Logistics Group</p>
        <p className="text-[10px] text-slate-600 font-mono mt-1">
          Confidential System Internal Module. Secure Key Auth Token LBX. Unauthorized leakage of trade logs strictly penalized under international law.
        </p>
      </footer>

      {/* INQUIRIES PROFILE DETAILS MODAL PANEL */}
      {selectedInquiry && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-fade-in font-sans">
          <div className="w-full max-w-2xl bg-slate-900 border border-slate-800 shadow-2xl rounded-sm overflow-hidden flex flex-col max-h-[85vh]">
            
            {/* Modal Header */}
            <div className="bg-slate-950 border-b border-slate-800 px-6 py-4 flex justify-between items-center text-white shrink-0">
              <div className="flex items-center space-x-2.5">
                <div className="w-7 h-7 rounded-sm bg-[#c5a059] flex items-center justify-center font-black text-slate-950 text-sm">
                  T
                </div>
                <div>
                  <h3 className="text-sm font-black text-[#c5a059] uppercase tracking-wider">{t.detailsTitle}</h3>
                  <p className="text-[10px] text-slate-500 font-mono">FILE: {selectedInquiry.id} • STATUS: {selectedInquiry.status}</p>
                </div>
              </div>
              <button
                onClick={() => setSelectedInquiry(null)}
                className="w-8 h-8 rounded-full border border-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition cursor-pointer"
              >
                &times;
              </button>
            </div>

            {/* Modal scrollable technical specifications parameters */}
            <div className="p-6 overflow-y-auto space-y-5 text-xs text-slate-300">
              
              {/* Row 1: Client and email */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Client Company */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.clientName}</span>
                  <span className="text-sm font-black text-white block mt-1">{selectedInquiry.clientName}</span>
                </div>

                {/* Email Address */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.emailAddress}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-mono text-slate-300 block font-bold truncate pr-3">{selectedInquiry.email}</span>
                    <a
                      href={`mailto:${selectedInquiry.email}?subject=Regarding your SinoSource ${selectedInquiry.productName} sourcing specs`}
                      className="text-[#c5a059] hover:text-yellow-400 font-black flex items-center space-x-0.5 shrink-0"
                    >
                      <Mail className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

              </div>

              {/* Row 2: Contact Communication channels & Incoterms */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Communication channels */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.contactInfo}</span>
                  <div className="flex items-center justify-between mt-1">
                    <span className="text-sm font-bold text-white block truncate pr-3">{selectedInquiry.contact}</span>
                    <div className="flex items-center space-x-1.5 shrink-0">
                      <a 
                        href={`tel:${selectedInquiry.contact}`} 
                        className="text-white hover:text-sky-400 p-1 bg-slate-900 border border-slate-800 rounded-sm transition"
                        title="Call Number"
                      >
                        <Phone className="w-3.5 h-3.5" />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Incoterms terms */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.tradeIncoterms}</span>
                  <span className="text-sm font-mono font-black text-white block mt-1 uppercase text-[#c5a059]">{selectedInquiry.incoterms}</span>
                </div>

              </div>

              {/* Row 3: Product Description & Quantity */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* Sourcing product demand */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.productDemand}</span>
                  <span className="text-sm font-black text-white block mt-1">{selectedInquiry.productName}</span>
                </div>

                {/* Requested procurement quantity */}
                <div className="bg-slate-950/40 p-3.5 border border-slate-805/60 rounded-sm">
                  <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.procQty}</span>
                  <span className="text-sm font-mono font-black text-white block mt-1 inline-flex items-center space-x-1.5">
                    <Briefcase className="w-3.5 h-3.5 text-[#c5a059] shrink-0" />
                    <span>{selectedInquiry.quantity}</span>
                  </span>
                </div>

              </div>

              {/* Row 4: Custom Technical Specifications (Molding / Tolerances / Quality limits) */}
              <div className="bg-slate-950/40 p-4 border border-slate-800 rounded-sm space-y-1.5">
                <span className="text-[10px] uppercase font-black text-slate-500 block tracking-wider">{t.purchSpecs}</span>
                <p className="text-xs text-slate-100 font-sans leading-relaxed whitespace-pre-wrap">
                  {selectedInquiry.specifications || "No specific technical requests."}
                </p>
              </div>

              {/* Pipeline Management Decision Panel (Update current state) */}
              <div className="bg-slate-950/60 p-4 border border-slate-800 rounded-sm space-y-3.5">
                <span className="text-[10px] uppercase font-black text-[#c5a059] block tracking-wider">{t.currentStatus}</span>
                
                <div className="flex flex-col sm:flex-row gap-3">
                  <select
                    value={editingStatus}
                    onChange={(e) => setEditingStatus(e.target.value)}
                    className="flex-grow bg-slate-900 border border-slate-800 text-slate-200 text-xs px-3.5 py-2 rounded-sm outline-none focus:border-[#c5a059] font-bold cursor-pointer uppercase"
                  >
                    {t.statusOptions.map(opt => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>

                  <button
                    onClick={() => handleUpdateStatus(selectedInquiry.id, editingStatus)}
                    disabled={isUpdatingStatus}
                    className="px-4 py-2 bg-[#c5a059] hover:bg-yellow-500 disabled:bg-slate-800 disabled:text-slate-500 text-slate-950 rounded-sm font-black hover:shadow-lg transition cursor-pointer shrink-0 text-xs uppercase"
                  >
                    {isUpdatingStatus ? T("提交中...", "Saving...", "Guardando...", "Сохранение...") : t.updateStatusBtn}
                  </button>
                </div>
              </div>

            </div>

            {/* Modal Footer actions */}
            <div className="bg-slate-950 border-t border-slate-800 px-6 py-4 flex justify-between shrink-0">
              
              {/* Wipe from register completely warning button */}
              <button
                onClick={() => {
                  if (confirm(t.confirmDelete)) {
                    handleDeleteInquiry(selectedInquiry.id);
                  }
                }}
                className="px-3.5 py-2 bg-red-950/40 hover:bg-red-900/30 border border-red-900/40 hover:border-red-500 text-red-300 hover:text-red-200 rounded-sm font-black text-xs uppercase transition cursor-pointer flex items-center space-x-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>{t.deleteBtn}</span>
              </button>

              <button
                onClick={() => setSelectedInquiry(null)}
                className="px-4 py-2 bg-slate-900 hover:bg-slate-850 hover:text-white border border-slate-800 text-slate-300 rounded-sm font-black text-xs uppercase transition cursor-pointer"
              >
                {t.closeDetailBtn}
              </button>

            </div>

          </div>
        </div>
      )}

    </div>
  );
}

// Global script rendering support for the multi-page entry point
const rootEl = document.getElementById("root");
if (rootEl) {
  createRoot(rootEl).render(
    <React.StrictMode>
      <AdminApp />
    </React.StrictMode>
  );
}
